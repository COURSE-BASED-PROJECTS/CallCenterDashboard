import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink, useHistory } from 'react-router-dom';
// Chakra imports
import {
    Box,
    Button,
    Checkbox,
    Flex,
    FormControl,
    FormLabel,
    Heading,
    Icon,
    Input,
    InputGroup,
    InputRightElement,
    Text,
    useColorModeValue,
} from '@chakra-ui/react';

// Custom components
import DefaultAuth from 'layouts/auth/Default';
import {
    loginUser,
    selectErrorLogin,
    selectLogin,
} from '../../../store/slices/authSlice';

// Assets
import illustration from 'assets/img/auth/auth.png';
import { MdOutlineRemoveRedEye } from 'react-icons/md';
import { RiEyeCloseLine } from 'react-icons/ri';
import { useEffect } from 'react';

function SignIn() {
    // Chakra color mode
    const textColor = useColorModeValue('navy.700', 'white');
    const textColorSecondary = 'gray.400';
    const textColorDetails = useColorModeValue('navy.700', 'secondaryGray.600');
    const textColorBrand = useColorModeValue('brand.500', 'white');
    const brandStars = useColorModeValue('brand.500', 'brand.400');

    const history = useHistory();
    const dispatch = useDispatch();
    const status = useSelector(selectLogin);
    const errorMessage = useSelector(selectErrorLogin);

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const [show, setShow] = React.useState(false);
    const handleClick = () => setShow(!show);

    const handleSubmit = () => {
        if (status !== 'succeeded')
            dispatch(loginUser({ username: username, password: password }));
    };
    const handleUsernameChange = (e) => setUsername(e.target.value);
    const handlePasswordChange = (e) => setPassword(e.target.value);

    useEffect(() => {
        if (status === 'succeeded') {
            history.push('/');
        } else if (status === 'failed') {
            alert(JSON.stringify('Đăng nhập chưa thành công!', null, 2));
            console.log(errorMessage);
        }
    }, [status, history, errorMessage]);
    return (
        <DefaultAuth illustrationBackground={illustration} image={illustration}>
            <Flex
                maxW={{ base: '100%', md: 'max-content' }}
                w='100%'
                mx={{ base: 'auto', lg: '0px' }}
                me='auto'
                h='100%'
                alignItems='start'
                justifyContent='center'
                mb={{ base: '30px', md: '60px' }}
                px={{ base: '25px', md: '0px' }}
                mt={{ base: '40px', md: '14vh' }}
                flexDirection='column'
            >
                <Box me='auto'>
                    <Heading color={textColor} fontSize='36px' mb='10px'>
                        ĐĂNG NHẬP
                    </Heading>
                    <Text
                        mb='36px'
                        ms='4px'
                        color={textColorSecondary}
                        fontWeight='400'
                        fontSize='md'
                    >
                        Nhập tên tài khoản và mật khẩu để tiếp tục!
                    </Text>
                </Box>
                <Flex
                    zIndex='2'
                    direction='column'
                    w={{ base: '100%', md: '420px' }}
                    maxW='100%'
                    background='transparent'
                    borderRadius='15px'
                    mx={{ base: 'auto', lg: 'unset' }}
                    me='auto'
                    mb={{ base: '20px', md: 'auto' }}
                >
                    <FormControl>
                        <FormLabel
                            display='flex'
                            ms='4px'
                            fontSize='md'
                            fontWeight='600'
                            color={textColor}
                            mb='8px'
                        >
                            Tên tài khoản<Text color={brandStars}>*</Text>
                        </FormLabel>
                        <Input
                            isRequired={true}
                            variant='auth'
                            fontSize='md'
                            ms={{ base: '0px', md: '0px' }}
                            type='text'
                            placeholder='Nhập tên tài khoản'
                            mb='24px'
                            fontWeight='600'
                            size='lg'
                            value={username}
                            onChange={handleUsernameChange}
                        />
                        <FormLabel
                            ms='4px'
                            fontSize='md'
                            fontWeight='600'
                            color={textColor}
                            display='flex'
                        >
                            Mật khẩu<Text color={brandStars}>*</Text>
                        </FormLabel>
                        <InputGroup size='md'>
                            <Input
                                isRequired={true}
                                fontSize='md'
                                placeholder='Nhập mật khẩu'
                                mb='24px'
                                size='lg'
                                type={show ? 'text' : 'password'}
                                variant='auth'
                                value={password}
                                onChange={handlePasswordChange}
                            />
                            <InputRightElement
                                display='flex'
                                alignItems='center'
                                mt='4px'
                            >
                                <Icon
                                    color={textColorSecondary}
                                    _hover={{ cursor: 'pointer' }}
                                    as={
                                        show
                                            ? RiEyeCloseLine
                                            : MdOutlineRemoveRedEye
                                    }
                                    onClick={handleClick}
                                />
                            </InputRightElement>
                        </InputGroup>
                        <Flex
                            justifyContent='space-between'
                            align='center'
                            mb='24px'
                        >
                            <FormControl display='flex' alignItems='center'>
                                <Checkbox
                                    id='remember-login'
                                    colorScheme='brandScheme'
                                    me='10px'
                                />
                                <FormLabel
                                    htmlFor='remember-login'
                                    mb='0'
                                    fontWeight='normal'
                                    color={textColor}
                                    fontSize='md'
                                >
                                    Ghi nhớ đăng nhập
                                </FormLabel>
                            </FormControl>
                            <NavLink to='/auth/forgot-password'>
                                <Text
                                    color={textColorBrand}
                                    fontSize='md'
                                    w='124px'
                                    fontWeight='600'
                                >
                                    Quên mật khẩu?
                                </Text>
                            </NavLink>
                        </Flex>
                        <Button
                            fontSize='20px'
                            variant='brand'
                            fontWeight='bold'
                            w='100%'
                            h='50'
                            mb='24px'
                            onClick={handleSubmit}
                        >
                            Đăng nhập
                        </Button>
                    </FormControl>
                    <Flex
                        flexDirection='column'
                        justifyContent='center'
                        alignItems='start'
                        maxW='100%'
                        mt='0px'
                    >
                        <Text
                            color={textColorDetails}
                            fontWeight='400'
                            fontSize='14px'
                        >
                            Không tìm thấy tài khoản?
                            <NavLink to='/auth/sign-up'>
                                <Text
                                    color={textColorBrand}
                                    as='span'
                                    ms='5px'
                                    fontWeight='600'
                                >
                                    Liên hệ quản lý
                                </Text>
                            </NavLink>
                        </Text>
                    </Flex>
                </Flex>
            </Flex>
        </DefaultAuth>
    );
}

export default SignIn;
