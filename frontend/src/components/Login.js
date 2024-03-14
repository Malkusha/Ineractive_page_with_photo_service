import * as auth from '../utils/auth';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import LoginForm from './LoginForm';
import InfoToolTip from './InfoTooltip';
import Fail from '../images/Fail.svg';


function Login({handleLogin}) {

  const navigate = useNavigate();
  const [isFailToolTipOpen, setIsFailToolTipOpen] = useState(false);

  function handleFailToolTip() {
    setIsFailToolTipOpen(true);
  }

  function handleAuthorize({email, password}) {
    auth.authorize(email, password)
      .then((data) => {
          localStorage.setItem("token", data.token);
          navigate("/", {replace: true});
          handleLogin(email);
        })
      .catch((err) => {
        handleFailToolTip();
        console.log(`Ошибка: ${err}`)
      });
  }

  return (
    <div className="profile__auth">
      <LoginForm
        authName="Authorization" 
        title="Вход" 
        submitTitle="Войти"
        onSubmit={handleAuthorize}
      />
    <InfoToolTip
      popupName="fail"
      title={<><p className="popup__text">Что-то пошло не так!</p><p className="popup__text">Попробуйте ещё раз.</p></>} 
      toolTipImg={Fail}
      isOpen={isFailToolTipOpen}
      onClose={() => setIsFailToolTipOpen(false)}
    />
    </div>
  )
}

export default Login;