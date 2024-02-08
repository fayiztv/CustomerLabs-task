import React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import ArrowBackIos from "@mui/icons-material/ArrowBackIos";
import "./modal.css";

const CustomModal = ({ isOpen, closeModal }) => {
  if (!isOpen) return null;

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
                >
                  <ArrowBackIos />
                </IconButton>
                <Typography
                  variant="h6"
                  align="left"
                  component="div"
                  sx={{ flexGrow: 1 }}
                >
                  View Audience
                </Typography>
              </Toolbar>
            </AppBar>
          </Box>
        </div>
        <div className="custom-modal-body">{/* {children} */}</div>
        {/* Add footer if needed */}
      </div>
    </div>
  );
};

export default CustomModal;
