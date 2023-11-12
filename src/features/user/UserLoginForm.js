import { useState } from 'react';
import  {validateUserLoginForm}  from '../../utils/validateUserLoginForm'; 
import { useSelector, useDispatch } from 'react-redux';
import { setCurrentUser, selectCurrentUser } from './userSlice';
import {
    Modal,
    ModalHeader,
    ModalBody,
    FormGroup,
    Label,
    Button
} from 'reactstrap';
import { Formik, Field, Form, ErrorMessage} from 'formik';
import defaultAvatar from '../../app/assets/img/unicorn.png';

const UserLoginForm = () =>{
  const  [loginModalOpen, setLoginModalOpen]= useState(false);

    const currentUser = useSelector(selectCurrentUser);
    const dispatch = useDispatch();

    const handleLogin =(values) =>{
        const currentUser = {
            id: Date.now(),
            avatar: defaultAvatar,
            username: values.username,
            password: values.password
        };

        dispatch(setCurrentUser(currentUser));
        setLoginModalOpen(false);

}
 return (
    <><span className='navbar-text ml-auto'>
        {currentUser ? (
                    <div style={{ width: '4rem', height: '4rem' }}>
                        <img
                            src={currentUser.avatar}
                            alt={'user'}
                            style={{ width: '100%', height: '100%' }}
                        />
                    </div>
                ) : (
                    <Button
                        outline
                        onClick={() => setLoginModalOpen(true)}
                        style={{ color: 'white', border: '1px solid white' }}
                    >
                        <i className='fa fa-sign-in fa-lg' /> Login
                    </Button>
                )}

    </span>
    <Modal isOpen={loginModalOpen}>
        <ModalHeader>Login</ModalHeader>
        <ModalBody toggle= {() => setLoginModalOpen(false)} >
            <Formik initialValues ={{ username: '', password: '' }} onSubmit={handleLogin} validate={validateUserLoginForm}>
                <Form>
                    <FormGroup>
                        <Label htmlFor='username'></Label>
                        <Field type='text'
                               name='username'
                               id='username'
                               placeholder='Username'
                               className='form-control'></Field>
                         <ErrorMessage name='username'>
                            {(msg) => <p className='text-danger'>{msg}</p>}
                        </ErrorMessage>
                    </FormGroup>
                    <FormGroup>
                          <Label htmlFor='password'>Password</Label>
                          <Field type='password'
                                 name='password'
                                 id='password'
                                 placeholder='Password'
                                 className='form-control'></Field>
                            <ErrorMessage name='password'>
                            {(msg) => <p className='text-danger'>{msg}</p>}
                        </ErrorMessage>
                    </FormGroup>
                    <Button type='submit' color='primary'>Login</Button>
                </Form>
            </Formik>
        </ModalBody>

    </Modal>
    </>
 )

}



export default UserLoginForm;