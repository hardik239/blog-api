import React, { useMemo, useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import "react-quill/dist/quill.bubble.css";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import axios from "axios";
import { MinLength, NotEmpty } from "../utils/Validations";
import swal from "sweetalert";

let quillObj = null;

const Categories = [
  { id: 1, text: "Technology" },
  { id: 2, text: "Travel" },
  { id: 3, text: "News" },
  { id: 4, text: "Personal" },
  { id: 5, text: "Movie" },
  { id: 6, text: "LifeStyle" },
  { id: 7, text: "Fashion" },
  { id: 8, text: "Sports" }
];

const CreatePost = () => {
  const [content, setContent] = useState("");

  const dispatch = useDispatch();
  const history = useHistory();

  const { token } = useSelector((state) => state.AuthReducer);

  const [currentImage, setCurrentImage] = useState("Choose image");
  const [previewImage, setPreviewImage] = useState("");

  const [post, setPost] = useState({
    title: "",
    image: ""
  });

  const handleFileChange = (e) => {
    if (e.target.files.length !== 0) {
      setCurrentImage(e.target.files[0].name);
      setPost({
        ...post,
        image: e.target.files[0]
      });
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewImage(reader.result);
      };
      reader.readAsDataURL(e.target.files[0]);
    }
  };

  const handleChange = (value) => {
    setContent(value);
  };

  function getCheckedBoxes(chkboxName) {
    const checkboxes = document.getElementsByName(chkboxName);
    let checkboxesChecked = [];

    for (let i = 0; i < checkboxes.length; i++) {
      if (checkboxes[i].checked) {
        checkboxesChecked.push(checkboxes[i].value);
      }
    }
    return checkboxesChecked;
  }

  const handlePublish = async (e) => {
    e.preventDefault();

    const selectedCategories = getCheckedBoxes("categorycheckbox");

    const { title, image } = post;

    if (NotEmpty(title) && MinLength(content)) {
      if (!image) {
        swal({
          title: "!! Warnign !!",
          text: "Please Select Cover Image For Your Article",
          icon: "info"
        });
      } else if (selectedCategories.length === 0) {
        swal({
          title: "!! Warnign !!",
          text: "Please Select Atleast One Category.",
          icon: "info"
        });
      } else {
        const formData = new FormData();
        formData.append("title", title);
        formData.append("body", JSON.stringify(content));
        formData.append("image", image);
        formData.append("token", token);

        formData.append("categories", JSON.stringify(selectedCategories));
        swal({
          title: "Please Wait",
          buttons: false
        });
        try {
          const response = await axios.post(
            "http://localhost:5000/post/create-post",
            formData
          );
          if (response.data.status === "success") {
            swal({
              title: "Good Job!!",
              text: response.data.msg,
              icon: "success"
            });
            dispatch({ type: "TOGGLE_STATE" });

            history.push("/");
          } else if (response.data.status === "warning") {
            swal({
              title: "!! Warnign !!",
              text: response.data.msg,
              icon: "info"
            });
          } else {
            swal({
              title: "Oppss!!",
              text: response.data.msg,
              icon: "error"
            });
          }
        } catch (error) {
          swal({
            title: "Oppss!!",
            text: error.message,
            icon: "error"
          });
          console.log(error);
        }
      }
    }
  };

  const discardChanges = () => {
    dispatch({ type: "REMOVE_DRAFT_POST" });
    swal({
      title: "Please Wait",
      buttons: false,
      timer: 500
    });
    history.push("/my-posts");
  };

  const handleDraftPost = () => {
    let draftPost = {
      title: post.title,
      image: previewImage,
      body: content,
      file: post.image,
      categories: getCheckedBoxes("categorycheckbox")
    };
    dispatch({ type: "SET_DRAFT_POST", draftPost });

    window.open("/preview");
  };

  const imageHandler = async () => {
    const input = document.createElement("input");

    input.setAttribute("type", "file");
    input.setAttribute("accept", "image/*");
    input.setAttribute("name", "file");
    input.click();

    input.onchange = async () => {
      let image = input.files[0];
      let formData = new FormData();

      formData.append("image", image);
      const config = {
        header: { "content-type": "multipart/form-data" }
      };

      const quill = quillObj.getEditor();
      quill.focus();
      let range = quill.getSelection(true);

      quill.insertEmbed(range.index, "image", "./images/Spinner.gif");
      quill.setSelection(range.index + 1);

      axios
        .post("http://localhost:5000/post/uploadfiles", formData, config)
        .then((response) => {
          if (response.data.success) {
            quill.deleteText(range.index, 1);

            quill.insertEmbed(range.index, "image", response.data.url);
            quill.setSelection(range.index + 1);
          } else {
            quill.deleteText(range.index, 0);
          }
        });
    };
  };

  const modules = useMemo(
    () => ({
      toolbar: {
        container: [
          [{ header: [1, 2, false] }],
          ["bold", "italic", "underline", "strike", "blockquote", "code-block"],
          [
            { list: "ordered" },
            { list: "bullet" },
            { indent: "-1" },
            { indent: "+1" }
          ],
          [{ align: ["right", "center", "justify"] }],
          ["link", "image", "video"],
          ["clean"]
        ],
        handlers: {
          image: imageHandler
        }
      }
    }),
    []
  );

  const formats = [
    "header",
    "bold",
    "italic",
    "underline",
    "strike",
    "blockquote",
    "list",
    "bullet",
    "indent",
    "link",
    "image",
    "code-block",
    "align"
  ];

  const handleCreatePost = (e) => {
    const { name, value } = e.target;
    setPost((prev) => {
      return { ...prev, [name]: value };
    });
  };

  return (
    <>
      <div className="container my-5  pt-3 px-md-3 create-post">
        <div className="row mt-4">
          <h3 className="">Add New Post</h3>
        </div>
        <form>
          <div className="row g-3">
            <div className="col-md-8">
              <input
                className="form-control form-control-lg mb-4 title"
                type="text"
                value={post.title}
                name="title"
                onChange={handleCreatePost}
                placeholder="post title"
                aria-label=".form-control-lg"
              />
              <ReactQuill
                ref={(el) => {
                  quillObj = el;
                }}
                className="bg-white editor"
                value={content}
                modules={modules}
                formats={formats}
                onChange={handleChange}
              />
            </div>
            <div className="col-md-4">
              <div className="accordion" id="accordionExample">
                <div className="accordion-item mb-3">
                  <h2 className="accordion-header" id="headingOne">
                    <button
                      className="accordion-button"
                      type="button"
                      data-bs-toggle="collapse"
                      data-bs-target="#collapseOne"
                      aria-expanded="true"
                      aria-controls="collapseOne">
                      Actions
                    </button>
                  </h2>
                  <div
                    id="collapseOne"
                    className="accordion-collapse collapse show"
                    aria-labelledby="headingOne"
                    data-bs-parent="#accordionExample">
                    <div className="accordion-body p-2 post-buttons d-flex flex-column flex-md-row justify-content-between">
                      <button
                        type="button"
                        className="action-button"
                        onClick={handleDraftPost}>
                        Launch Preview
                      </button>
                      <button className="action-button" onClick={handlePublish}>
                        Publish
                      </button>
                      <button
                        className="action-button"
                        onClick={discardChanges}>
                        Discard Changes
                      </button>
                    </div>
                  </div>
                </div>
                <div className="accordion-item mb-3">
                  <h2 className="accordion-header" id="headingTwo">
                    <button
                      className="accordion-button collapsed"
                      type="button"
                      data-bs-toggle="collapse"
                      data-bs-target="#collapseTwo"
                      aria-expanded="false"
                      aria-controls="collapseTwo">
                      Cover Image
                    </button>
                  </h2>
                  <div
                    id="collapseTwo"
                    className="accordion-collapse collapse post-buttons"
                    aria-labelledby="headingTwo"
                    data-bs-parent="#accordionExample">
                    <div className="accordion-body">
                      <label
                        htmlFor="selectCover"
                        className="text-center w-100 fs-6 action-button">
                        <input
                          type="file"
                          name="image"
                          id="selectCover"
                          onChange={handleFileChange}
                          style={{ display: "none" }}
                        />
                        {currentImage}
                      </label>
                    </div>
                  </div>
                </div>
                <div className="accordion-item">
                  <h2 className="accordion-header" id="headingThree">
                    <button
                      className="accordion-button collapsed "
                      type="button"
                      data-bs-toggle="collapse"
                      data-bs-target="#collapseThree"
                      aria-expanded="false"
                      aria-controls="collapseThree">
                      Categories
                    </button>
                  </h2>
                  <div
                    id="collapseThree"
                    className="accordion-collapse collapse post-buttons"
                    aria-labelledby="headingThree"
                    data-bs-parent="#accordionExample">
                    <div className="accordion-body">
                      <div className="row">
                        {Categories.map((category) => {
                          return (
                            <div className="col-6" key={category.id}>
                              <div className="form-check mb-2">
                                <input
                                  className="form-check-input"
                                  type="checkbox"
                                  name="categorycheckbox"
                                  value={category.text}
                                  id={category.id}
                                />
                                <label
                                  className="form-check-label"
                                  htmlFor={category.id}>
                                  {category.text}
                                </label>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </form>
      </div>
    </>
  );
};

export default CreatePost;
