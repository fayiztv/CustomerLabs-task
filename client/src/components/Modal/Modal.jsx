import React, { useState } from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import ArrowBackIos from "@mui/icons-material/ArrowBackIos";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import Button from "@mui/material/Button";
import DeleteIcon from "@mui/icons-material/Delete";
import Swal from "sweetalert2";
import axios from "axios";
import "./modal.css";

const initialSchemas = [
  { label: "First Name", value: "first_name" },
  { label: "Last Name", value: "last_name" },
  { label: "Gender", value: "gender" },
  { label: "Age", value: "age" },
  { label: "Account Name", value: "account_name" },
  { label: "City", value: "city" },
  { label: "State", value: "state" },
];

const CustomModal = ({ isOpen, closeModal }) => {
  if (!isOpen) return null;

  const [segmentName, setSegmentName] = useState("");
  const [selectedSchemas, setSelectedSchemas] = useState({});
  const [schemas, setSchemas] = useState(initialSchemas);
  const [currentSelection, setCurrentSelection] = useState("");

  const handleSegmentNameChange = (event) => {
    setSegmentName(event.target.value);
  };

  const handleAddSchema = (event) => {
    const newSelection = event.target.value;
    setCurrentSelection("");
    const selectedOption = schemas.find(
      (schema) => schema.value === newSelection
    );
    if (selectedOption) {
      setSelectedSchemas({
        ...selectedSchemas,
        [selectedOption.value]: "",
      });
      setSchemas(schemas.filter((schema) => schema.value !== newSelection));
    }
  };

  const handleInputChange = (value, schemaKey) => {
    setSelectedSchemas({
      ...selectedSchemas,
      [schemaKey]: value,
    });
  };

  const handleDeleteSchema = (key) => {
    const { [key]: _, ...remainingSchemas } = selectedSchemas;
    setSelectedSchemas(remainingSchemas);

    const schemaToAddBack = initialSchemas.find(
      (schema) => schema.value === key
    );
    if (schemaToAddBack && !schemas.some((schema) => schema.value === key)) {
      setSchemas(
        [...schemas, schemaToAddBack].sort((a, b) =>
          a.label.localeCompare(b.label)
        )
      );
    }
  };

  const handleSubmit = async () => {
    const payload = {
      segment_name: segmentName,
      schema: Object.entries(selectedSchemas).map(([key, value]) => ({
        [key]: value,
      })),
    };

    try {
      const response = await axios.post(
        "https://webhook.site/a99abbfe-f6f7-4016-a25c-956ff299a658",
        payload
      );
      closeModal();
      Swal.fire("Success!", "Schema Added Succesfully", "success");
    } catch (error) {
      Swal.fire("Oops", "Somthing Went Wrong", "error");
    }
  };

  return (
    <div className="custom-modal-overlay">
      <div
        className="custom-modal-content"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="custom-modal-header">
          <Box sx={{ flexGrow: 1 }}>
            <AppBar position="static">
              <Toolbar>
                <IconButton
                  size="large"
                  edge="start"
                  color="inherit"
                  aria-label="menu"
                  sx={{ mr: 2 }}
                  className="bold-icon"
                  onClick={closeModal}
                >
                  <ArrowBackIos />
                </IconButton>
                <Typography
                  variant="h6"
                  align="left"
                  component="div"
                  sx={{ flexGrow: 1 }}
                >
                  Saving segment
                </Typography>
              </Toolbar>
            </AppBar>
          </Box>
        </div>
        <div className="custom-modal-body">
          <div className="main-content">
            <div className="heading-div">
              <h3 className="heading">Enter the Name of the Segment</h3>
            </div>
            <div className="input-div">
              <TextField
                className="input"
                label="Name of the segment"
                id="outlined-size-normal"
                size="normal"
                value={segmentName}
                onChange={handleSegmentNameChange}
              />
            </div>
            <div className="text-div">
              <h3 className="text">
                To save your segment, you need to add the schemas to build the
                query
              </h3>
            </div>
            <div className="dots-div">
              <div className="dot1"></div>{" "}
              <h4 className="dodts-text">- User Traits</h4>
              <div className="dot2"></div>{" "}
              <h4 className="dodts-text">- Group Traits</h4>
            </div>
            {Object.entries(selectedSchemas).map(([key, value]) => {
              const schema = initialSchemas.find((s) => s.value === key);
              return (
                <div className="schemas-div" key={key}>
                  <div
                    style={{ marginRight: "10px" }}
                    className={key !== "account_name" ? "dot1" : "dot3"}
                  ></div>
                  <TextField
                    className="input"
                    label={schema ? schema.label : ""}
                    value={value}
                    onChange={(e) => handleInputChange(e.target.value, key)}
                    size="normal"
                    style={{ width: "85%" }}
                  />
                  <Button
                    style={{ marginLeft: "10px" }}
                    variant="contained"
                    onClick={() => handleDeleteSchema(key)}
                  >
                    <DeleteIcon />
                  </Button>
                </div>
              );
            })}

            <div className="dropdown-div">
              <TextField
                className="input"
                id="outlined-select-currency"
                select
                label="Add schema to segment"
                value={currentSelection}
                onChange={handleAddSchema}
              >
                {schemas.map((option) => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))}
              </TextField>
            </div>
            <div className="link-div">
              <p className="link">+ Add new schema</p>
            </div>
          </div>
          <div className="buttons-div">
            <Button className="submit-button" onClick={handleSubmit}>
              Save
            </Button>
            <Button className="submit-button" onClick={closeModal}>
              Cancel
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CustomModal;
