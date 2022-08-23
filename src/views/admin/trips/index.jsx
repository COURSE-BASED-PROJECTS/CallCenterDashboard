import React, { useEffect } from 'react';

// Chakra imports
import { Table, Thead, Tbody, Tr, Th, Td, TableContainer } from '@chakra-ui/react';
import { Box, Text, useColorModeValue } from '@chakra-ui/react';
import Card from 'components/card/Card';
import { useDispatch, useSelector } from 'react-redux';
import { hailingSelector } from 'store/slices/hailingSlice';
import SockJS from 'sockjs-client';
import Stomp from 'stompjs';
import { setStatusPackage } from 'store/slices/hailingSlice';
import axios from 'axios';
import { driverAPI } from 'service/API';
import { setTravelInfomation } from 'store/slices/hailingSlice';
import { selectStatus } from 'store/slices/taxiSlice';
import { selectTaxis } from 'store/slices/taxiSlice';
import { fetchTaxis } from 'store/slices/taxiSlice';
import { selectStatusFetchDrivers } from 'store/slices/driverSlice';
import { selectDrivers } from 'store/slices/driverSlice';
import { fetchDrivers } from 'store/slices/driverSlice';
import NumberFormat from 'react-number-format';

let stompClient = null;

export default function TripList() {
    const dispatch = useDispatch();
    const textColor = useColorModeValue('secondaryGray.900', 'white');

    const statusFetchTaxis = useSelector(selectStatus);
    const taxis = useSelector(selectTaxis);
    useEffect(() => {
        if (statusFetchTaxis !== 'succeeded' && !taxis) {
            dispatch(fetchTaxis());
        }
    }, [statusFetchTaxis, dispatch, taxis]);

    const statusFetchDrivers = useSelector(selectStatusFetchDrivers);
    const listDrivers = useSelector(selectDrivers);
    useEffect(() => {
        if (statusFetchDrivers !== 'succeeded' && !listDrivers) {
            dispatch(fetchDrivers());
        }
    }, [statusFetchDrivers, dispatch, listDrivers]);

    const { travelInformation, statusPackage } = useSelector(hailingSelector);
    useEffect(() => {
        const socket = new SockJS('http://localhost:8080/ws');
        stompClient = Stomp.over(socket);

        stompClient.connect({}, onConnected, onError);

        return () => stompClient && stompClient.disconnect();
    }, []);

    const onConnected = () => {
        console.log('onConnected');
        // Subscribe to the Public Topic
        stompClient.subscribe('/topic/public', onMessageReceived);
        stompClient.subscribe('/topic/callcenter', onMessageReceivedPrivate);
    };

    const onError = (error) => {
        console.log(error);
    };
    const onMessageReceived = (payload) => {
        console.log('onMessageReceived');
        const message = JSON.parse(payload.body);
        console.log(message);
    };

    const onMessageReceivedPrivate = (payload) => {
        const message = JSON.parse(payload.body);
        console.log(message);
        if (message.status === 'no_driver') {
            setTimeout(() => {
                dispatch(setStatusPackage('Không tìm thấy tài xế!'));
            }, 2000);
            console.log(message.status);
        } else if (message.status === 'have_driver') {
            console.log(message.status);

            if (message?.idDriver) {
                axios
                    .get(driverAPI + message?.idDriver)
                    .then(function (res) {
                        const driverInfo = res.data;
                        console.log(driverInfo);
                        if (driverInfo !== null && res.status === 200) {
                            dispatch(
                                setTravelInfomation({
                                    ...message,
                                    ...driverInfo,
                                })
                            );
                        }
                    })
                    .catch(function (error) {
                        console.log(error);
                    })
                    .then(function () {
                        // always executed
                    });
            }
        } else if (message.status === 'end') {
            dispatch(setStatusPackage('Chuyến đi kết thúc!'));

            dispatch(setTravelInfomation(null));

            console.log(message.status);
        }
    };

    return (
        <Box pt={{ base: '180px', md: '80px', xl: '80px' }}>
            <Card w='100%'>
                {console.log(travelInformation)}

                {travelInformation &&
                Object.keys(travelInformation).length === 0 &&
                Object.getPrototypeOf(travelInformation) === Object.prototype ? (
                    <Text color={textColor} fontSize='2xl' ms='24px' fontWeight='700'>
                        Hiện chưa có thông tin chuyến đi mới!
                    </Text>
                ) : (
                    <>
                        {travelInformation.status === 'have_driver' ? (
                            <>
                                <Text color={textColor} fontSize='xl' ms='24px' fontWeight='700'>
                                    Theo dõi chuyến đi: {travelInformation.idClient}
                                </Text>
                                <TableContainer>
                                    <Table variant='striped' colorScheme='teal'>
                                        <Tbody>
                                            <Tr>
                                                <Td>Tài xế tiếp nhận</Td>
                                                <Td>
                                                    <div>
                                                        Mã tài xế: {travelInformation?.idDriver}
                                                        {listDrivers ? (
                                                            <>
                                                                {' - '}
                                                                {
                                                                    listDrivers[travelInformation?.idDriver - 1]
                                                                        .driverName
                                                                }
                                                                {' - '}
                                                                {
                                                                    listDrivers[travelInformation?.idDriver - 1]
                                                                        .phoneNumber
                                                                }
                                                            </>
                                                        ) : null}
                                                    </div>
                                                </Td>
                                            </Tr>
                                            <Tr>
                                                <Td>Thông tin xe</Td>
                                                <Td>
                                                    {taxis ? (
                                                        <div>
                                                            {taxis[travelInformation?.taxi_id - 1]?.taxiName}
                                                            {' - '}
                                                            {taxis[travelInformation?.taxi_id - 1]?.plate}
                                                        </div>
                                                    ) : null}
                                                </Td>
                                            </Tr>
                                            <Tr>
                                                <Td>Điểm đón</Td>
                                                <Td>{travelInformation?.hailing.locationStart.name}</Td>
                                            </Tr>
                                            <Tr>
                                                <Td>Điểm đón</Td>
                                                <Td>{travelInformation?.hailing.locationEnd.name}</Td>
                                            </Tr>
                                            <Tr>
                                                <Td>Loại xe</Td>
                                                <Td>
                                                    {taxis ? (
                                                        <>{taxis[travelInformation?.taxi_id - 1]?.carType}</>
                                                    ) : null}
                                                </Td>
                                            </Tr>
                                            <Tr>
                                                <Td>Khoảng cách</Td>
                                                <Td>
                                                    {(travelInformation?.hailing.distance / 1000).toFixed(1) + ' km'}
                                                </Td>
                                            </Tr>
                                            <Tr>
                                                <Td>Thời gian dự kiến</Td>
                                                <Td>{travelInformation?.timeTrip}</Td>
                                            </Tr>
                                            <Tr>
                                                <Td>Giá tiền</Td>
                                                <Td>
                                                    <NumberFormat
                                                        value={travelInformation?.hailing?.cost ?? 0}
                                                        displayType='text'
                                                        thousandSeparator
                                                        renderText={(value) => <Text>{value + 'đ'}</Text>}
                                                    />
                                                </Td>
                                            </Tr>
                                            <Tr>
                                                <Td>Thời gian đặt</Td>
                                                <Td>
                                                    {new Date(travelInformation?.hailing.timeStart).toLocaleString()}
                                                </Td>
                                            </Tr>
                                        </Tbody>
                                    </Table>
                                </TableContainer>
                            </>
                        ) : (
                            <Text color={textColor} fontSize='2xl' ms='24px' fontWeight='700'>
                                {statusPackage}
                            </Text>
                        )}
                    </>
                )}
            </Card>
        </Box>
    );
}
