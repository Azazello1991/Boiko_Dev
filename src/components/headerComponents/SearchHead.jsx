import React from "react";
import { useEffect, useRef } from "react";
import { useTranslation } from "react-i18next";
// redux
import { useSelector, useDispatch } from "react-redux";
import { sortByData, updateSearchValue } from "../../redux/slices/filterSlice";
import { useNavigate, useLocation } from "react-router-dom";

const SearchHead = () => {
  const { t } = useTranslation();
  const location = useLocation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const searchRef = useRef(null);
  const searchValue = useSelector(
    (state) => state.filterSlice.params.searchValue
  );

  const obj = {
    obj: {
      name: "Задати фільтр",
      sotrProperty: "-price",
    },
  };

  // Функція що перекида на галерею пари фокусі пошуку
  const handleOpen = () => {
    navigate("/gallery");
  };

  // функція що перевіря евент
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchRef.current && searchRef.current.contains(event.target)) {
        handleOpen();
        event.target.focus();
      }
    };

    document.addEventListener("click", handleClickOutside);

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [searchRef]);

  // Після переходу на галерею встановлюємо фокус на поле пошуку
  
  useEffect(() => {
    if (location.pathname === "/gallery") {
      searchRef.current?.focus();
    }
  }, [navigate]);

  // З-за проблем несумісності запиту на MockApi, при пошуку скидуємо gender на -price.
  const updateSortByValue = () => {
    if (searchValue) {
      dispatch(sortByData(obj));
    }
  };

  const onChangeInpute = (event) => {
    updateSortByValue();
    dispatch(updateSearchValue(event.target.value));
  };

  return (
    <div className="container-btn">
      <div className="search-container">
        <input
          ref={searchRef}
          onChange={(event)=>onChangeInpute(event)}
          type="text"
          placeholder={t("search")}
          value={searchValue}
        ></input>
        <a className="button-circle">
          <i className="fa fa-search"></i>
        </a>
      </div>
    </div>
  );
};

export default SearchHead;
