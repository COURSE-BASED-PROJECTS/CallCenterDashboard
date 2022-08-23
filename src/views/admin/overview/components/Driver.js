import React, { useEffect } from 'react';
import { Table, Thead, Tbody, Tr, Th, Td, TableContainer } from '@chakra-ui/react';
import { useDispatch, useSelector } from 'react-redux';
import { selectStatusFetchDrivers } from 'store/slices/driverSlice';
import { selectDrivers } from 'store/slices/driverSlice';
import { fetchDrivers } from 'store/slices/driverSlice';
import { selectStatus } from 'store/slices/taxiSlice';
import { selectTaxis } from 'store/slices/taxiSlice';
import { fetchTaxis } from 'store/slices/taxiSlice';

const Driver = () => {
    const dispatch = useDispatch();

    const statusFetchTaxis = useSelector(selectStatus);
    const taxis = useSelector(selectTaxis);

    const statusFetchDrivers = useSelector(selectStatusFetchDrivers);
    const listDrivers = useSelector(selectDrivers);

    useEffect(() => {
        if (statusFetchTaxis !== 'succeeded') {
            dispatch(fetchTaxis());
        }
    }, [statusFetchTaxis, dispatch]);

    useEffect(() => {
        if (statusFetchDrivers !== 'succeeded') {
            dispatch(fetchDrivers());
        }
    }, [statusFetchDrivers, dispatch]);

    return (
        <div>
            <TableContainer>
                <Table variant='striped' colorScheme='teal'>
                    <Thead>
                        <Tr>
                            <Th isNumeric>Mã tài xế</Th>
                            <Th>Tên tài xế</Th>
                            <Th>SĐT Tài xế</Th>
                            <Th>GPLX</Th>
                            <Th>Tên xe</Th>
                            <Th>Biển số xe</Th>
                            <Th>Loại xe</Th>
                        </Tr>
                    </Thead>
                    <Tbody>
                        {listDrivers?.map((item) => (
                            <Tr>
                                <Td>{item.driverId}</Td>
                                <Td>{item.driverName}</Td>
                                <Td>{item.phoneNumber}</Td>
                                <Td>{item.identification}</Td>
                                {taxis ? (
                                    <>
                                        <Td>{taxis[item.taxi_id - 1]?.taxiName}</Td>
                                        <Td>{taxis[item.taxi_id - 1]?.plate}</Td>
                                        <Td>{taxis[item.taxi_id - 1]?.carType}</Td>
                                    </>
                                ) : (
                                    <>
                                        <Td>{item.driverId}</Td>
                                        <Td>{item.driverId}</Td>
                                    </>
                                )}
                            </Tr>
                        ))}
                    </Tbody>
                </Table>
            </TableContainer>
        </div>
    );
};

export default Driver;
