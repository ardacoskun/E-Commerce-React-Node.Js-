import React from "react";
import { Breadcrumb, BreadcrumbItem } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import { useLocation } from "react-router-dom";

const BreadCrumbs = () => {
  const location = useLocation();
  const pathNames = location.pathname.split("/").filter((item) => item);

  if (pathNames[2]) {
    const newPath = pathNames[2].split("-");
    if (newPath.length === 2) {
      pathNames[2] = newPath[1];
    }
    if (newPath.length == 3) {
      pathNames[2] = newPath[2];
    }
    if (newPath.length == 4) {
      pathNames[2] = `${newPath[2]} ${newPath[3]}`;
    }
  }
  return (
    <>
      <Breadcrumb style={{ margin: "10px" }}>
        {pathNames.length > 0 ? (
          <LinkContainer to="/">
            <Breadcrumb.Item>HOME</Breadcrumb.Item>
          </LinkContainer>
        ) : (
          <Breadcrumb.Item>HOME</Breadcrumb.Item>
        )}
        {pathNames.map((path, index) => {
          const routeTo = `/${pathNames.slice(0, index + 1).join("/")}`;
          const isLast = index === pathNames.length - 1;
          return isLast ? (
            <Breadcrumb.Item key={index}>{path.toUpperCase()}</Breadcrumb.Item>
          ) : (
            <LinkContainer to={`${routeTo}`} key={index}>
              <Breadcrumb.Item>{path.toUpperCase()}</Breadcrumb.Item>
            </LinkContainer>
          );
        })}
      </Breadcrumb>
    </>
  );
};

export default BreadCrumbs;
