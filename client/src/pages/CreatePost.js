import React, { useMemo, useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import "react-quill/dist/quill.bubble.css";
import { useSelector, useDispatch } from "react-redux";
import { Link, useHistory } from "react-router-dom";
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
  const [content, setContent] = useState({
    text: ""
  });

  const token = useSelector((state) => state.token);

  const [currentImage, setCurrentImage] = useState("Choose image");

  const [post, setPost] = useState({
    title: "",
    image: ""
  });

  const fileHandle = (e) => {
    if (e.target.files.length !== 0) {
      setCurrentImage(e.target.files[0].name);
      setPost({
        ...post,
        image: e.target.files[0]
      });
    }
  };

  const [files, setFiles] = useState("");

  const onFilesChange = (e) => {
    setFiles(e.target.files[0]);
  };

  const dispatch = useDispatch();
  const history = useHistory();

  // const preview = () => {

  // }

  const handleChange = (value) => {
    setContent({ text: value });
  };

  function getCheckedBoxes(chkboxName) {
    var checkboxes = document.getElementsByName(chkboxName);
    var checkboxesChecked = [];
    // loop over them all
    for (var i = 0; i < checkboxes.length; i++) {
      // And stick the checked ones onto an array...
      if (checkboxes[i].checked) {
        checkboxesChecked.push(checkboxes[i].value);
      }
    }
    // Return the array if it is non-empty, or null
    return checkboxesChecked;
  }

  const handlePublish = async (e) => {
    e.preventDefault();

    const selectedCategories = getCheckedBoxes("categorycheckbox");

    // make req...
    const { title, image } = post;
    if (NotEmpty(title) && MinLength(content.text)) {
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
        formData.append("body", JSON.stringify(content.text));
        formData.append("image", image);
        formData.append("token", token);

        formData.append("categories", JSON.stringify(selectedCategories));

        try {
          const response = await axios.post(
            "http://localhost:5000/user/create-post",
            formData
          );
          if (response.data.status === "success") {
            swal({
              title: "Good Job!!",
              text: response.data.msg,
              icon: "success"
            });
            dispatch({
              type: "SET_PUBLISH_POST",
              post: response.data.response
            });
            history.push("/preview");
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

  const testPostFun = () => {
    let post = {
      title: "rkbhgjkr",
      image: "bdcjdsbjkcds",
      body: JSON.stringify(content.text),
      categories: []
    };
    dispatch({ type: "SET_PUBLISH_POST", post });
    history.push("/preview");
  };

  const imageHandler = async () => {
    const input = document.createElement("input");

    input.setAttribute("type", "file");
    input.setAttribute("accept", "image/*");
    input.setAttribute("name", "file");
    input.click();

    input.onchange = async () => {
      let file = input.files[0];
      let formData = new FormData();

      let fileName = file.name;
      formData.append("file", file);
      const config = {
        header: { "content-type": "multipart/form-data" }
      };

      const quill = quillObj.getEditor();
      quill.focus();
      let range = quill.getSelection(true);

      quill.insertEmbed(range.index, "image", "./images/Spinner.gif");
      quill.setSelection(range.index + 1);

      axios
        .post("http://localhost:5000/user/uploadfiles", formData, config)
        .then((response) => {
          if (response.data.success) {
            console.log(response);
            quill.deleteText(range.index, 1);

            quill.insertEmbed(
              range.index,
              "image",
              "./images/" + response.data.url
            );
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
    "code-block"
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
                value={content.text}
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
                        onClick={testPostFun}>
                        Launch Preview
                      </button>
                      <button className="action-button" onClick={handlePublish}>
                        Publish
                      </button>
                      <button className="action-button">Move To Trash</button>
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
                          onChange={onFilesChange}
                          name="image"
                          id="selectCover"
                          onChange={fileHandle}
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
                                  // onChange={() => handleCategory(category.id)}
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
