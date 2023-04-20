import React, { useContext } from "react";
import { ProductsContext } from "../store/Store";
import { NavLink } from "react-router-dom";
const Footer = () => {
  let { categories } = useContext(ProductsContext);
  let activeStyle = {
    borderBottom: "1px solid white",
  };
  return (
    <div className="footer">
      <div className="container">
        <div className="row">
          <div className="col-lg-6 col-md-6 col-sm-12">
            <div className="categories">
              <ul>
                <li>Categories</li>
                {categories &&
                  categories.map((category, index) => {
                    return (
                      <li key={index}>
                        <NavLink
                          className="category-link"
                          style={({ isActive }) =>
                            isActive ? activeStyle : undefined
                          }
                          exact to={`/categories/${category.slug}`}
                        >
                          {category.title}
                        </NavLink>
                      </li>
                    );
                  })}
              </ul>
            </div>
          </div>
          <div className="col-lg-6 col-md-6 col-sm-12">
            <div className="social-media">
              <a href="" target="_blank" className="instagram">
                <i className="fab fa-instagram"></i>
              </a>
              <a
                href="https://twitter.com/xhoudharyhamza"
                target="_blank"
                className="twitter"
              >
                <i className="fab fa-twitter"></i>
              </a>
              <a
                href="https://www.linkedin.com/in/muhammadhamzaashraf/"
                target="_blank"
                className="linkedin"
              >
                <i className="fab fa-linkedin-in"></i>
              </a>
              <a
                href="https://github.com/xhoudharyhamza"
                target="_blank"
                className="github"
              >
                <i className="fab fa-github"></i>
              </a>
            </div>
          </div>
        </div>
      </div>
      <div className="copyright">
        <p>
          <span>
            <i className="far fa-copyright"></i>:
          </span>
          2023 Grab&Go
        </p>
      </div>
    </div>
  );
};

export default Footer;
