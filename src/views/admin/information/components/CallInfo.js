import React, { useEffect, useState } from 'react';
import Stomp from 'stompjs';
import SockJS from 'sockjs-client';

import Card from 'components/card/Card';
import Alert from 'components/alert/alert';
import { MdOutlineGpsFixed } from 'react-icons/md';

import {
    Button,
    ButtonGroup,
    Flex,
    FormControl,
    FormLabel,
    Input,
    InputGroup,
    Select,
    Spacer,
    Text,
} from '@chakra-ui/react';
import { useColorModeValue } from '@chakra-ui/system';
import { ArrowForwardIcon } from '@chakra-ui/icons';
import { CreatableSelect } from 'chakra-react-select';

import { Location } from '../variables/data';
import axios from 'axios';
import { distanceAPI } from '../../../../service/API';
import calCostTrip from 'utils/calCostTrip';

let stompClient = null;

export default function CallInfo() {
    const [statusFetchData, setStatusFetchData] = useState('idle');
    const [listOfAddress, setListOfAddress] = useState(null);

    const textColor = useColorModeValue('secondaryGray.900', 'white');

    const [phoneNumber, setPhoneNumber] = useState('');
    const [cusName, setCusNumber] = useState('');
    const [arrivingAddress, setArrivingAddress] = useState('');
    const [pickingAddress, setPickingAddress] = useState('');
    const [lngPicking, setLngPicking] = useState('');
    const [latPicking, setLatPicking] = useState('');
    const [lngArriving, setLngArriving] = useState('');
    const [latArriving, setLatArriving] = useState('');
    const [carType, setCarType] = useState('');
    const [distance, setDistance] = useState(0);
    const [duration, setDuration] = useState(0);

    const handlePhoneNumber = (e) => setPhoneNumber(e.target.value);
    const handleCusName = (e) => setCusNumber(e.target.value);
    const handleArrivingAddress = (address = null, actionMeta = null) => {
        setArrivingAddress(address.value);
        setLngArriving(address.GPS.longitude);
        setLatArriving(address.GPS.latitude);
    };
    const handlePickingAddress = (address = null, actionMeta = null) => {
        setPickingAddress(address.value);
        setLatPicking(address.GPS.latitude);
        setLngPicking(address.GPS.longitude);
    };
    const handleLngPicking = (e) => setLngPicking(e.target.value);
    const handleLatPicking = (e) => setLatPicking(e.target.value);
    const handleLngArriving = (e) => setLngArriving(e.target.value);
    const handleLatArriving = (e) => setLatArriving(e.target.value);
    const handleCarType = (e) => setCarType(e.target.value);

    const [fetchDistance, setFetchDistance] = useState(false);
    useEffect(() => {
        // calculate the distance between 2 places
        if (!fetchDistance && latArriving && latPicking && lngArriving && lngPicking) {
            console.log(fetchDistance);

            axios
                .get(distanceAPI, {
                    params: {
                        origin: lngPicking + ',' + latPicking,
                        destination: lngArriving + ',' + latArriving,
                        vehicle: 'car',
                        api_key: GOONG_REST_API,
                    },
                })
                .then(function (response) {
                    if (response.status === 200) {
                        const dataTravel = response.data.routes[0].legs[0];

                        setDistance(dataTravel.distance.value);
                        setDuration(dataTravel.duration.value);

                        setFetchDistance(true);
                    }
                })
                .catch(function (error) {
                    console.log(error);
                })
                .then(function () {
                    // always executed
                });
        }
    }, [distance, latArriving, latPicking, lngArriving, lngPicking, carType, fetchDistance]);

    const handleOnSubmit = () => {
        const packageHailing = {
            idHailing: null,
            idDriver: null,
            idClient: phoneNumber,
            hailing: {
                locationStart: {
                    latitude: latPicking,
                    longitude: lngPicking,
                    name: pickingAddress,
                },
                locationEnd: {
                    latitude: latArriving,
                    longitude: lngArriving,
                    name: arrivingAddress,
                },
                distance: distance,
                timeDuring: duration,
                timeStart: new Date(Date.now() - new Date().getTimezoneOffset() * 60000).toISOString().slice(0, -1),
                cost: parseInt(calCostTrip(distance, 0.26 * parseInt(carType))),
                carType: carType,
            },
            status: 'SENT',
            scope: ['callcenter'],
        };

        console.log(packageHailing);

        if (stompClient !== null) {
            stompClient.send('/app/order.getOrder', {}, JSON.stringify(packageHailing));
        }
    };

    const [showAlert, setShowAlert] = useState(false);
    const handleClose = () => {
        setShowAlert(false);
    };
    const alert = {
        type: 'succeed',
        show: showAlert,
        message: 'Thông tin đặt xe đã được chuyển sang bộ phận định vị GPS',
        handleClose: handleClose,
        redirect: '#',
    };
    const handleGPS = () => {
        setShowAlert(true);
    };

    // connect the socket service
    useEffect(() => {
        const socket = new SockJS('http://localhost:8080/ws');
        stompClient = Stomp.over(socket);

        stompClient.connect({}, onConnected, onError);

        return () => stompClient && stompClient.disconnect();
    }, []);

    const onConnected = () => {
        console.log('onConnected');
        stompClient.subscribe('/topic/public', onMessageReceived);
    };

    const onError = (error) => {
        console.log(error);
    };

    const onMessageReceived = (payload) => {
        console.log('onMessageReceived');
        const message = JSON.parse(payload.body);
        console.log(message);
    };

    useEffect(() => {
        if (statusFetchData !== 'successed') {
            if (Location && statusFetchData !== 'successed') {
                setListOfAddress(getListOfName());
                setStatusFetchData('successed');
            }
        }
    }, []);
    function getListOfName() {
        let names = [];
        Location.map((subitem) =>
            names.push({
                value: subitem.location_name,
                label: subitem.location_name,
                GPS: { latitude: subitem.latitude, longitude: subitem.longitude },
            })
        );
        return names;
    }

    return (
        <Card direction='column' w='100%' px='2%' overflowX={{ sm: 'scroll', lg: 'hidden' }}>
            <Flex
                zIndex='1'
                direction='column'
                maxW='100%'
                background='transparent'
                borderRadius='15px'
                mx={{ base: 'auto', lg: 'unset' }}
                me='auto'
                mb={{ base: '20px', md: 'auto' }}
            >
                <FormControl isRequired>
                    <InputGroup mb='15px' width={'70%'}>
                        <Text width={'20%'} color='green.500' fontSize='md' fontWeight='700' mt='13px' mr='0.5em'>
                            Cuộc gọi từ
                        </Text>
                        <Input
                            variant='auth'
                            isRequired={true}
                            type='number'
                            placeholder='Nhập số điện thoại'
                            mb='24px'
                            fontWeight='700'
                            size='lg'
                            color={textColor}
                            fontSize='34px'
                            value={phoneNumber}
                            onChange={handlePhoneNumber}
                        />
                    </InputGroup>

                    <FormLabel display='flex' ms='4px' fontSize='md' fontWeight='600' color={textColor} mb='8px'>
                        Tên khách hàng
                    </FormLabel>

                    <Flex>
                        <Input
                            w={'70%'}
                            isRequired={true}
                            variant='auth'
                            fontSize='lg'
                            ms={{ base: '0px', md: '0px' }}
                            type='text'
                            placeholder='Nhập tên khách hàng'
                            mb='24px'
                            fontWeight={'bold'}
                            size='lg'
                            value={cusName}
                            onChange={handleCusName}
                        />
                        <Spacer />

                        <FormLabel me='14px' mt='11px' fontSize='md' fontWeight='600' color={textColor} display='flex'>
                            Loại xe
                        </FormLabel>

                        <Select
                            w={'20%'}
                            fontWeight={'bold'}
                            fontSize='md'
                            size='lg'
                            placeholder='Loại xe'
                            onChange={handleCarType}
                        >
                            <option value='4'>Xe 4 chỗ</option>
                            <option value='7'>Xe 7 chỗ</option>
                        </Select>
                    </Flex>

                    <FormLabel ms='4px' mt='8px' fontSize='md' fontWeight='600' color={textColor} display='flex'>
                        Địa chỉ đón
                    </FormLabel>

                    <CreatableSelect
                        selectedOptionStyle='check'
                        placeholder={'Chọn/Nhập địa chỉ đón'}
                        size='lg'
                        fontWeight={'bold'}
                        fontSize='lg'
                        onChange={handlePickingAddress}
                        options={listOfAddress}
                        formatCreateLabel={(value) => `+ Thêm mới ${value}`}
                    ></CreatableSelect>

                    <Text mt='10px' ms='4px' mb='4px' fontSize='md' fontWeight='600' color='green.500' display='flex'>
                        GPS
                    </Text>
                    <Flex mb='30px'>
                        <Input
                            isRequired={true}
                            variant='auth'
                            fontSize='lg'
                            type='text'
                            placeholder='Kinh độ (lngPicking)'
                            mr='24px'
                            fontWeight={'bold'}
                            size='lg'
                            value={lngPicking}
                            onChange={handleLngPicking}
                        />
                        <Input
                            isRequired={true}
                            variant='auth'
                            fontSize='lg'
                            type='text'
                            placeholder='Vĩ độ (latPicking)'
                            ml='24px'
                            fontWeight={'bold'}
                            size='lg'
                            value={latPicking}
                            onChange={handleLatPicking}
                        />
                    </Flex>
                    <FormLabel ms='4px' fontSize='md' fontWeight='600' color={textColor} display='flex'>
                        Địa chỉ đến
                    </FormLabel>

                    <CreatableSelect
                        // cacheOptions
                        // defaultOptions
                        // loadOptions={stateOptions}
                        selectedOptionStyle='check'
                        // isClearable
                        isSearchable
                        placeholder={'Chọn/Nhập địa chỉ đến'}
                        size='lg'
                        fontWeight={'bold'}
                        fontSize='lg'
                        onChange={handleArrivingAddress}
                        options={listOfAddress}
                        formatCreateLabel={(value) => `+ Thêm mới ${value}`}
                    ></CreatableSelect>

                    <Text mt='10px' ms='4px' mb='4px' fontSize='md' fontWeight='600' color='green.500' display='flex'>
                        GPS
                    </Text>

                    <Flex mb='20px'>
                        <Input
                            variant='auth'
                            fontSize='lg'
                            type='text'
                            placeholder='Kinh độ (lngArriving)'
                            mr='24px'
                            fontWeight={'bold'}
                            size='lg'
                            value={lngArriving}
                            onChange={handleLngArriving}
                        />
                        <Input
                            variant='auth'
                            fontSize='lg'
                            type='text'
                            placeholder='Vĩ độ (latArriving)'
                            ml='24px'
                            fontWeight={'bold'}
                            size='lg'
                            value={latArriving}
                            onChange={handleLatArriving}
                        />
                    </Flex>

                    <Button
                        colorScheme='whatsapp'
                        fontSize='20px'
                        fontWeight='bold'
                        w='100%'
                        h='50'
                        mb='40px'
                        mt='24px'
                        leftIcon={<MdOutlineGpsFixed />}
                        onClick={handleGPS}
                    >
                        Định vị GPS
                        {showAlert ? <Alert {...alert} /> : null}
                    </Button>
                    <ButtonGroup w={'100%'} spacing='6'>
                        <Button fontSize='20px' variant='outline' fontWeight='bold' w='100%' h='50' mb='24px'>
                            Huỷ
                        </Button>
                        <Button
                            fontSize='20px'
                            variant='brand'
                            fontWeight='bold'
                            w='100%'
                            h='50'
                            mb='24px'
                            rightIcon={<ArrowForwardIcon />}
                            onClick={handleOnSubmit}
                        >
                            Gửi đi
                        </Button>
                    </ButtonGroup>
                </FormControl>
            </Flex>
        </Card>
    );
}
