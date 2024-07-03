import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  Box,
  Avatar,
  IconButton,
  Badge,
} from "@mui/material";

import ThumbUpAltIcon from "@mui/icons-material/ThumbUpAlt";
import { useNavigate } from "react-router-dom";

const Blog = ({ blog }) => {
  const [claps, setClaps] = useState(0);
  const navigate = useNavigate();

  const handleClap = (event) => {
    event.stopPropagation();
    setClaps(claps + 1);
  };

  const getDate = (dateString) => {
    return dateString.split("T")[0];
  };

  const handleBlogClick = () => {
    navigate("/blogDetail", { state: { id: blog._id } });
  };

  return (
    <Card onClick={handleBlogClick} style={{ cursor: "pointer" }}>
      <CardMedia
        component="img"
        height="250"
        image={blog.image}
        alt={blog.title}
      />
      <CardContent
        sx={{
          height: "200px",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
        }}
      >
        <Box>
          <Typography
            gutterBottom
            variant="h5"
            component="div"
            sx={{
              fontWeight: "bold",
              display: "-webkit-box",
              WebkitBoxOrient: "vertical",
              WebkitLineClamp: 2,
              overflow: "hidden",
              textOverflow: "ellipsis",
            }}
          >
            {blog.title}
          </Typography>
          <Typography
            variant="body1"
            sx={{
              display: "-webkit-box",
              WebkitBoxOrient: "vertical",
              WebkitLineClamp: 3,
              overflow: "hidden",
              textOverflow: "ellipsis",
            }}
          >
            {blog.summary}
          </Typography>
        </Box>
        <Box sx={{ display: "flex", alignItems: "center", marginTop: 2 }}>
          <Avatar
            sx={{
              bgcolor: "#b7d0e1",
              color: "#194569",
              marginRight: 1,
            }}
          >
            {blog.author.charAt(0).toUpperCase()}
          </Avatar>
          <Typography variant="body2" color="textSecondary">
            {getDate(blog.createdAt)}
          </Typography>
          <IconButton
            sx={{ marginLeft: "auto" }}
            onClick={handleClap}
            color="primary"
          >
            <Badge badgeContent={claps} sx={{ color: "#728495" }}>
              <ThumbUpAltIcon />
            </Badge>
          </IconButton>
        </Box>
      </CardContent>
    </Card>
  );
};

export default Blog;
