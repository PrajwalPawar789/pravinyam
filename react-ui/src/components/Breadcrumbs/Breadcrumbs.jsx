import React from "react";
import {
  Breadcrumbs as MUIBreadcrumbs,
  Link,
  Typography
} from "@mui/material";
import { useNavigate, useLocation } from "react-router-dom";
import NavigateNextIcon from '@mui/icons-material/NavigateNext'

const Breadcrumbs = () => {
  const navigate = useNavigate();
  const { pathname } = useLocation();

  const pathnames = pathname.split("/").filter(x => x);

  return (
    <div style={{
      width: '100%',
      backgroundColor: 'gray'
    }}>
      <MUIBreadcrumbs color="inherit" separator={<NavigateNextIcon fontSize="small" color="inherit" />} aria-label="breadcrumb" sx={{
        padding: '.5rem 1rem',
        width: '100%',
        backgroundColor: '#f5f5f5',
        boxShadow: 'inset 0px 0px 30px rgb(230, 230, 250,0.8)'
      }}>
        {pathnames.length ? (
          <Link underline="hover" sx={{
            cursor: "pointer",
            textDecoration: 'none',
            color: 'inherit'
          }} onClick={() => navigate("/")}>Home</Link>
        ) : (
          <Typography sx={{
            border: '1px solid #f5f5f5',
            borderRadius: '15px',
            padding: '3px 10px',
            backgroundColor: '#fffafa',
          }}>Home</Typography>
        )}
        {pathnames.map((name, index) => {
          const routeTo = `/${pathnames.slice(0, index + 1).join("/")}`;
          const isLast = index === pathnames.length - 1;
          return isLast ? (
            <Typography key={name} sx={{
              border: '1px solid #f5f5f5',
              borderRadius: '15px',
              padding: '3px 10px',
              backgroundColor: '#fffafa',
              textTransform: 'capitalize',
              fontFamily: 'Poppins',
            }}>{name}</Typography>
          ) : (
            <Link key={name} onClick={() => navigate(routeTo)}>
              {name}
            </Link>
          );
        })}
      </MUIBreadcrumbs>
    </div>
  );
};

export default Breadcrumbs;