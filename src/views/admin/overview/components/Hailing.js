import React, { useEffect } from 'react';
import { Table, Thead, Tbody, Tfoot, Tr, Th, Td, TableCaption, TableContainer } from '@chakra-ui/react';
import { useDispatch, useSelector } from 'react-redux';
import { selectStatusFetchHailing } from 'store/slices/hailingSlice';
import { selectListHailing } from 'store/slices/hailingSlice';
import { fetchListOfHailing } from 'store/slices/hailingSlice';
import { selectStatusFetchDrivers } from 'store/slices/driverSlice';
import { selectDrivers } from 'store/slices/driverSlice';
import { fetchDrivers } from 'store/slices/driverSlice';
import { FcInfo } from 'react-icons/fc';

const Hailing = () => {
    const dispatch = useDispatch();

    const statusFetchHailing = useSelector(selectStatusFetchHailing);
    const listHailing = useSelector(selectListHailing);

    const statusFetchDrivers = useSelector(selectStatusFetchDrivers);
    const listDrivers = useSelector(selectDrivers);

    useEffect(() => {
        if (statusFetchHailing !== 'succeeded') {
            dispatch(fetchListOfHailing());
        }
    }, [statusFetchHailing, dispatch]);

    useEffect(() => {
        if (statusFetchDrivers !== 'succeeded') {
            dispatch(fetchDrivers());
        }
    }, [statusFetchDrivers, dispatch]);

    console.log(listHailing);

    return (
        <div>
            <TableContainer>
                <Table variant='striped' colorScheme='teal'>
                    <Thead>
                        <Tr>
                            <Th isNumeric>Mã chuyến đi</Th>
                            <Th isNumeric>Cuộc gọi từ</Th>
                            <Th>Tài xế</Th>
                            <Th>SĐT Tài xế</Th>
                            <Th>Trạng thái</Th>
                            <Th>Đặt từ</Th>
                            <Th>Xem chi tiết</Th>
                        </Tr>
                    </Thead>
                    <Tbody>
                        {listHailing?.map((item) => (
                            <Tr>
                                <Td>{item.hailing_id}</Td>
                                <Td>{item.client_id}</Td>
                                {listDrivers ? (
                                    <>
                                        <Td>{listDrivers[item.driver_id - 1]?.driverName}</Td>
                                        <Td>{listDrivers[item.driver_id - 1]?.phoneNumber}</Td>
                                    </>
                                ) : (
                                    <>
                                        <Td>{item.driver_id}</Td>
                                        <Td>{item.driver_id}</Td>
                                    </>
                                )}
                                <Td>{item.status}</Td>
                                <Td>{item.scope}</Td>
                                <Td>
                                    <FcInfo />
                                </Td>
                            </Tr>
                        ))}
                    </Tbody>
                </Table>
            </TableContainer>
        </div>
    );
};

export default Hailing;
