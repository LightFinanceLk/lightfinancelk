import React, { useRef, useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import userApi from "../../api/userApi.js";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSave, faEdit, faFileImage } from "@fortawesome/free-solid-svg-icons";

const ImageUpload = (props) => {
  const userId = useSelector((state) => state.auth.userId);
  const [file, setFile] = useState();
  const [previewUrl, setPreviewUrl] = useState();
  const [imageValue, setImageValue] = useState("");

  const filePickerRef = useRef();

  useEffect(() => {
    if (!file) {
      return;
    }
    const fileReader = new FileReader();
    fileReader.onload = () => {
      setPreviewUrl(fileReader.result);
    };
    fileReader.readAsDataURL(file);
  }, [file]);

  const pickedHandler = (event) => {
    let pickedFile;
    if (event.target.files && event.target.files.length === 1) {
      pickedFile = event.target.files[0];
      setFile(pickedFile);
      setImageValue(pickedFile);
    }
  };

  const pickImageHandler = () => {
    filePickerRef.current.click();
  };

  const handleSubmit = async () => {
    try {
      const formData = new FormData();
      formData.append("image", imageValue);
      userApi.updateProfileImage(userId, formData);
    } catch (err) {}
  };

  return (
    <div>
      <input
        id={props.id}
        ref={filePickerRef}
        style={{ display: "none" }}
        type="file"
        accept=".jpg,.png,.jpeg"
        onChange={pickedHandler}
      />
      <div className="lf-image-upload">
        <div className="lf-image-upload__preview">
          {previewUrl && <img src={previewUrl} alt="Preview" />}
          {!previewUrl && <p>Please pick an image.</p>}
        </div>
        <div className="lf-image-upload__buttons">
          <button className="btn btn-outline-secondary" onClick={handleSubmit}>
            <FontAwesomeIcon icon={faSave} />
          </button>
          <button
            className="btn btn-outline-secondary"
            onClick={pickImageHandler}
          >
            <FontAwesomeIcon icon={faFileImage} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ImageUpload;
