import styles from './Authorization.module.scss'
import { useState, useEffect } from 'react'
import cn from 'classnames'
import { Fingerprint } from '../Fingerprint/Fingerprint'

export const Authorization = () => {
    const date = new Date()
    const [isActive, setIsActive] = useState(true)
    const [isAuth, setIsAuth] = useState(false)
    const [user, setUser] = useState({
        date: new Intl.DateTimeFormat('ru-Ru').format(date),
        email: "",
    })

    const initialForm = {
        date: "",
        email: "",
        password: "",
    }

    const [formState, setFormState] = useState(initialForm)
    const [isValid, setValid] = useState(
        {
            email: false,
            password: false,
        }
    )

    function PasswordWithValidationHandler(e: React.ChangeEvent<HTMLInputElement>) {
        if (e.target.value.length < 6) {
            setValid({
                ...isValid,
                [e.target.name]: false,
            })
        }
        if (e.target.value.length >= 6) {
            setValid({
                ...isValid,
                [e.target.name]: true,
            })
        }
        setFormState((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value,
        }));
    }

    function EmailWithValidationHandler(e: React.ChangeEvent<HTMLInputElement>) {
        function isEmail(email: string) {
            return /^((([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+(\.([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+)*)|((\x22)((((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(([\x01-\x08\x0b\x0c\x0e-\x1f\x7f]|\x21|[\x23-\x5b]|[\x5d-\x7e]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(\\([\x01-\x09\x0b\x0c\x0d-\x7f]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))))*(((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(\x22)))@((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))$/i.test(email);
        }
        if (isEmail(e.target.value.toLowerCase())) {
            setValid({
                ...isValid,
                [e.target.name]: true,
            })
        }
        if (!isEmail(e.target.value.toLowerCase())) {
            setValid({
                ...isValid,
                [e.target.name]: false,
            })
        }
        setFormState((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value,
        }))
    }


    const submitEmail = async (e: React.MouseEvent<HTMLInputElement>) => {
        e.preventDefault()
        if (isValid.email && isValid.password) {
            await fetch(`/`, {
                method: "POST",
                headers: {
                    "Content-type": "application/json",
                },
                body: JSON.stringify({ formState }),
            })
                // .then((res) => res.json())
                // .then(async (res) => {
                //     const resData = await res;
                //     resData.status = 'success'
                //     if (resData.status === 'success') {

                //     } else if (resData.status === 'error') {

                //     }
                // })
                .then(() => {
                    setFormState(initialForm)
                    setIsActive(false)
                    setIsAuth(true)
                    setUser({
                        ...user,
                        email: formState.email,
                    })
                })
                .catch(() => {

                })
                .finally(() => {
                    setFormState(initialForm)
                })
        }
    }

    // function startAnimation() {
    //     setTimeout(() => {
    //         setIsActive(true)
    //     }, [500])
    // }
    // useEffect(() => {
    //     startAnimation()
    // }, [])

    return (
        !isAuth ?
            <>
                <div className={styles.layout}>
                    <div className={cn(styles.authorization, {
                        [styles.active]: isActive
                    })}>
                        <div className={styles.logo}>
                            <span className={styles.title}>Y_LAB_University</span>
                            <div className={styles.fingerprint}>
                                <img src={require('./assets/Frame.png')} alt="ylab" />
                                <Fingerprint />
                            </div>
                        </div>

                        <div className={styles.input__container}>
                            <input className={cn(styles.input, {
                                [styles.invalid]: !isValid.email
                            })}
                                type="text"
                                name='email'
                                required={true}
                                autoComplete='off'
                                title='Введенный адрес должен содержать символов "@"'
                                value={formState.email}
                                onChange={EmailWithValidationHandler}
                            />
                            <span className={styles.text}>Email или логин пользователя</span>
                            <span className={styles.line}></span>
                        </div>
                        <div className={styles.input__container}>
                            <input className={cn(styles.input, {
                                [styles.invalid]: !isValid.password
                            })}
                                type="password"
                                name='password'
                                required={true}
                                autoComplete='off'
                                title='Длина пароля должна быть не менее 6 символов'
                                value={formState.password}
                                onChange={PasswordWithValidationHandler}
                            />
                            <span className={styles.text}>Пароль</span>
                            <span className={styles.line}></span>
                        </div>
                        <div className={styles.submit__container}>
                            <input className={cn(styles.submit, {
                                [styles.unactive]: !isValid.email || !isValid.password
                            })} type="submit" value='Войти' onClick={submitEmail} />
                            {!isValid.password || !isValid.email ?
                                <blockquote className={styles.blockquote}>
                                    Необходимо заполнить все поля
                                </blockquote> : null}
                        </div>
                    </div>
                </div>
            </> : <div className={styles.layout}>
                <button className={styles.logout} 
                    onClick={() => {
                    setIsAuth(!isAuth)
                    setIsActive(true)
                    setValid({
                        email: false,
                        password: false,
                    })
                }}>
                    <p>{user.date}: Успешный вход.</p>
                    <p>Выполнить выход пользователя: {user.email}</p>
                </button>
            </div>
    )
}