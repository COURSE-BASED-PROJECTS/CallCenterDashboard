import { Box, SimpleGrid } from '@chakra-ui/react';
import TaxisTable from 'views/admin/dataTables/components/TaxisTable';
import { columnsTaxisTable } from 'views/admin/dataTables/variables/columnsData';

import React from 'react';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectStatus, selectTaxis, fetchTaxis } from 'store/slices/taxiSlice';

export default function Settings() {
    const dispatch = useDispatch();
    const status = useSelector(selectStatus);
    const taxis = useSelector(selectTaxis);
    // const errorMessage = useSelector(selectErrorTaxis);
    useEffect(() => {
        console.log(status);
        if (status === 'idle') {
            dispatch(fetchTaxis());
        }
    }, [status, taxis, dispatch]);
    return (
        <Box pt={{ base: '130px', md: '80px', xl: '80px' }}>
            <SimpleGrid
                mb='20px'
                columns={{ sm: 1, md: 2 }}
                spacing={{ base: '20px', xl: '20px' }}
            >
                <TaxisTable columnsData={columnsTaxisTable} tableData={taxis} />
            </SimpleGrid>
        </Box>
    );
}
