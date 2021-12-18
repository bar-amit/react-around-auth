import React from "react";
import { Routes, Route, Outlet, useNavigate } from "react-router-dom";
import Header from "./Header";
import Main from "./Main";
import Footer from "./Footer";
import PopupWithForm from "./PopupWithForm";
import EditProfilePopup from "./EditProfilePopup";
import EditAvatarPopup from "./EditAvatarPopup";
import AddPlacePopup from "./AddPlacePopup";
import ImagePopup from "./ImagePopup";
import Login from "./Login";
import Register from "./Register";
import ProtectedRoute from "./ProtectedRoute";
import InfoTooltip from "./InfoTooltip";

import { auth } from "../utils/auth";
import api from "../utils/api";

import { CurrentUserContext } from "../contexts/CurrentUserContext";

function App() {
  const [currentUser, setCurrentUser] = React.useState({
    signedIn: null,
    email: auth.user.email,
    name: "",
    about: "",
    _id: "",
  });

  const [cards, setCards] = React.useState([]);

  const navigate = useNavigate();

  /*
    Popups state
  */
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] =
    React.useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] =
    React.useState(false);
  const [confirmPopupState, setConfirmPopupState] = React.useState({
    isOpen: false,
    cardId: "",
  });
  const [isInfoTooltipOpen, setisInfoTooltipOpen] = React.useState({
    isOpen: false,
    hasSucceed: false,
  });

  const [selectedCard, setSelectedCard] = React.useState({});

  const closeAllPopups = () => {
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsEditAvatarPopupOpen(false);
    setSelectedCard({});
    setisInfoTooltipOpen({ ...isInfoTooltipOpen, isOpen: false });
  };

  React.useEffect(() => {
    const handleEscapeClose = (e) => {
      if (e.key === "Escape") closeAllPopups();
    };

    document.addEventListener("keydown", handleEscapeClose);

    return () => document.removeEventListener("keydown", handleEscapeClose);
  }, []);

  /*
    Page's buttons click handlers
  */
  const handleEditProfileClick = () => setIsEditProfilePopupOpen(true);
  const handleAddPlaceClick = () => setIsAddPlacePopupOpen(true);
  const handleEditAvatarClick = () => setIsEditAvatarPopupOpen(true);

  /*
    Form data functions
  */
  /**
   * Update profile info
   * @param {{name: string, about: string}} param0
   * @returns Promise
   */
  function handlProfileSubmit({ name, about }) {
    return api
      .updateUser({ name, about })
      .then((data) => setCurrentUser({ ...currentUser, ...data }))
      .then(() => setIsEditProfilePopupOpen(false))
      .catch((e) => console.log(e));
  }
  /**
   * Add a new card
   * @param {{name: string, link: string}} param0
   * @returns Promise
   */
  function handlePlaceSubmit({ name, link }) {
    return api
      .addCard({ name, link })
      .then((card) => setCards([card, ...cards]))
      .then(() => setIsAddPlacePopupOpen(false))
      .catch((e) => console.log(e));
  }
  /**
   * Set a new avatar
   * @param {string} link
   * @returns Promise
   */
  function handleAvatarSubmit(link) {
    return api
      .updateUserAvatar(link)
      .then(({ avatar }) => setCurrentUser({ ...currentUser, avatar }))
      .then(() => setIsEditAvatarPopupOpen(false))
      .catch((e) => console.log(e));
  }
  /**
   * Confirmation dialog to delete a card
   * @returns Promise
   */
  function handleConfirmSubmit() {
    const id = confirmPopupState.cardId;
    return api
      .deleteCard(id)
      .then(setCards(cards.filter((card) => card._id !== id)))
      .then(() => setConfirmPopupState({ isOpen: false, cardId: "" }))
      .catch((e) => console.log(e));
  }

  /*
    Card functions
  */
  const handleCardClick = (card) => setSelectedCard(card);
  const handleCardLike = (card) => {
    const hasLike = card.likes.some((like) => like._id === currentUser._id);
    const updateLikes = hasLike
      ? api.removeLike.bind(api)
      : api.addLike.bind(api);
    updateLikes(card._id)
      .then(updateCards)
      .catch((e) => console.log(e));
  };
  const handleCardDelete = (card) => {
    setConfirmPopupState({ isOpen: true, cardId: card._id });
  };

  /*
    Api calls
  */
  function updateCards() {
    return api
      .getCards()
      .then((data) => setCards(data))
      .catch((e) => console.log(e));
  }

  function updateUserInfo() {
    return api
      .getUserInfo()
      .then((data) => setCurrentUser({ ...currentUser, ...data }))
      .catch((e) => console.log(e));
  }

  React.useEffect(() => {
    if (currentUser.signedIn)
      Promise.all([updateCards(), updateUserInfo()]).catch((e) =>
        console.log(e)
      );
  }, [currentUser.signedIn]);

  /*
    Auth
  */

  function login({ email, password }) {
    return auth
      .signin({ email, password })
      .then(() => {
        setCurrentUser({
          ...currentUser,
          signedIn: auth.isSignedIn,
          email: auth.user.email,
        });
      })
      .then(() => navigate("/", { replace: true }))
      .catch(() => setisInfoTooltipOpen({ isOpen: true, hasSucceed: false }));
  }

  function register({ email, password }) {
    return auth
      .signup({ email, password })
      .then((data) => {
        if (data.error) throw new Error({ message: "Failed to register" });
        setisInfoTooltipOpen({ isOpen: true, hasSucceed: true });
        console.log({ email, password });
        login({ email, password });
      })
      .catch(() => {
        setisInfoTooltipOpen({ isOpen: true, hasSucceed: false });
      });
  }

  function logout() {
    auth.logout();
    setCurrentUser({ ...currentUser, signedIn: false, email: null });
  }

  React.useEffect(() => {
    if (currentUser.signedIn === null)
      auth.initialize().then(() => {
        if (auth.isSignedIn) {
          setCurrentUser({
            ...currentUser,
            signedIn: true,
            email: auth.user.email,
          });
          navigate("/", { replace: true });
        }
      });
  }, [auth.isSignedIn]);

  return (
    <>
      <CurrentUserContext.Provider value={currentUser}>
        <Header onLogout={logout} />
        <Routes>
          <Route path="/login" element={<Login handleLogin={login} />} />
          <Route
            path="/register"
            element={<Register handleRegistration={register} />}
          />
          <Route
            path="/*"
            element={
              <ProtectedRoute>
                <Main
                  onEditProfileClick={handleEditProfileClick}
                  onAddPlaceClick={handleAddPlaceClick}
                  onEditAvatarClick={handleEditAvatarClick}
                  onCardClick={handleCardClick}
                  onCardLike={handleCardLike}
                  onCardDelete={handleCardDelete}
                  cardsList={cards}
                />
              </ProtectedRoute>
            }
          />
        </Routes>
        <Outlet />

        <InfoTooltip {...isInfoTooltipOpen} onClose={closeAllPopups} />

        <EditProfilePopup
          title="Edit profile"
          name="edit-profile"
          buttonText="Save"
          isOpen={isEditProfilePopupOpen}
          onClose={closeAllPopups}
          onSubmit={handlProfileSubmit}
        />

        <AddPlacePopup
          title="New Place"
          name="new-place"
          buttonText="Create"
          isOpen={isAddPlacePopupOpen}
          onClose={closeAllPopups}
          onSubmit={handlePlaceSubmit}
        />

        <EditAvatarPopup
          title="Change profile picture"
          name="edit-avatar"
          buttonText="Save"
          isOpen={isEditAvatarPopupOpen}
          onClose={closeAllPopups}
          onSubmit={handleAvatarSubmit}
        />

        <PopupWithForm
          title="Are you sure?"
          name="confirm"
          buttonText="Yes"
          isOpen={confirmPopupState.isOpen}
          onClose={closeAllPopups}
          onSubmit={handleConfirmSubmit}
        />

        <ImagePopup card={selectedCard} onClose={closeAllPopups} />
      </CurrentUserContext.Provider>

      <Footer />
    </>
  );
}

export default App;
