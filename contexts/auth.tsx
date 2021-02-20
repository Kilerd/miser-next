import React, {createContext, useState, useContext, useEffect} from 'react'
import Cookies from 'js-cookie'
import Router, {useRouter} from 'next/router'
import api from '../api'


interface User {
    id: number,
    username: string,
    email: string,
    avatar: string,
    ledgers: string[]
}


interface AuthContextType {
    isAuthenticated: boolean,
    user: User | undefined,
    loading: boolean,

    login(email: string, password: string): void,

    register(email: string, username: string, password: string): void,

    logout(): void,
}

const UNAUTHENTICATED_ROUTE = ["login", 'register']
const AuthContext = createContext({} as AuthContextType);

export const AuthProvider = ({children}) => {
    const [user, setUser] = useState(undefined);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function loadUserFromCookies() {
            const token = Cookies.get('token')
            console.log("token", token);
            if (token) {
                console.log("Got a token in the cookies, let's see if it is valid")
                api.defaults.headers.Authorization = `Bearer ${token}`
                const {data: user} = await api.get('/user')
                if (user) setUser(user.data);
            }
            setLoading(false)
        }

        loadUserFromCookies()
    }, [])


    const login = async (email, password) => {
        const {data: resData} = await api.post('/authorization', {email, password})
        let token = resData.data;
        if (token) {
            console.log("Got token")
            Cookies.set('token', token, {expires: 60})
            api.defaults.headers.Authorization = `Bearer ${token}`
            const {data: user} = await api.get('/user')
            setUser(user.data)
            console.log("Got user", user)
        }
    }

    const register = async (email, username, password) => {
        const {data: resData} = await api.post('/user', {email, username, password})
        console.log("resData", resData);
        const token = resData.data;
        if (token) {
            console.log("Got token")
            Cookies.set('token', token, {expires: 60})
            api.defaults.headers.Authorization = `Bearer ${token}`
            const {data: user} = await api.get('/user')
            setUser(user)
            console.log("Got user", user)
        }
    }
    const logout = () => {
        Cookies.remove('token')
        setUser(undefined)
        delete api.defaults.headers.Authorization
        window.location.pathname = '/'
    }

    return (
        <AuthContext.Provider value={{isAuthenticated: !!user, user, login, loading, logout, register}}>
            {children}
        </AuthContext.Provider>
    )
}

export const useAuth = () => useContext(AuthContext)

export const ProtectRoute = (ChildComponent) => (args) => {
    const {isAuthenticated, loading} = useAuth();
    const router = useRouter();

    if (loading) {
        return <div>loading</div>
    }
    if (!isAuthenticated && !UNAUTHENTICATED_ROUTE.includes(router.asPath)) {
        router.push("/login");
    }
    return <ChildComponent {...args} />;
};
