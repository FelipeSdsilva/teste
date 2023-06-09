import { ChangeEvent, useEffect, useState } from 'react';
import { Box, Button, Grid, TextField, Typography } from '@material-ui/core'
import './style.css'
import ImgLogin from '../../assets/img/Game analytics-amico.svg'
import { Link, useNavigate } from 'react-router-dom'
import UserLogin from '../../models/UserLogin';
import useLocalStorage from 'react-use-localstorage';
import { api, login } from '../../services/Service';


export default function Login() {

    const navigate = useNavigate();
    const [token, setToken] = useLocalStorage('token');
    const [userLogin, setUserLogin] = useState<UserLogin>(
        {
            id: 0,
            usuario: '',
            senha: '',
            token: ''
        }
    )

    function updatedModel(e: ChangeEvent<HTMLInputElement>) {

        setUserLogin({
            ...userLogin,
            [e.target.name]: e.target.value
        })
    }

    useEffect(() => {
        if (token != '') {
            navigate('/home')
        }
    }, [token])

    async function onSubmit(e: ChangeEvent<HTMLFormElement>) {
        e.preventDefault();
        try {
            await login(`/usuarios/logar`, userLogin, setToken)

            alert('Usuário logado com sucesso!');
        } catch (error) {
            alert('Dados do usuário inconsistentes. Erro ao logar!');
        }
    }

    return (
        <>
            <Grid container direction='row' justifyContent='center' alignItems='center'>
                <Grid alignItems='center' xs={6}>
                    <Box paddingX={20}>
                        <Box className='box-input'>
                            <form onSubmit={onSubmit}>
                                <Typography variant='h3' gutterBottom color='textPrimary' component='h3' align='center' className='textos1'>Entrar</Typography>
                                <TextField value={userLogin.usuario} onChange={(e: ChangeEvent<HTMLInputElement>) => updatedModel(e)} id='usuario' label='usuário' variant='outlined' name='usuario' margin='normal' fullWidth />
                                <TextField value={userLogin.senha} onChange={(e: ChangeEvent<HTMLInputElement>) => updatedModel(e)} id='senha' label='senha' variant='outlined' name='senha' margin='normal' type='password' fullWidth />
                                <Box marginTop={2} textAlign='center'>
                                    <Button type='submit' variant='contained' color='primary'>
                                        Logar
                                    </Button>
                                </Box>
                            </form>
                            <Box display='flex' justifyContent='center' marginTop={2}>
                                <Box marginRight={1}>
                                    <Typography variant='subtitle1' gutterBottom align='center'>Não tem uma conta?</Typography>
                                </Box>
                                <Link to={`/cadastro`} className='text-decorator-none'>
                                    <Typography variant='subtitle1' gutterBottom align='center' className='signUp' >Cadastre-se</Typography>
                                </Link>
                            </Box>
                        </Box>

                    </Box>
                </Grid>
                <Grid xs={6} className='imagem'>
                    <img src={ImgLogin} alt="" />
                </Grid>
            </Grid>
        </>
    )
}