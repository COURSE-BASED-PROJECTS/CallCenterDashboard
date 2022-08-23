// Chakra imports
import { Box, Grid, Text, useColorModeValue } from '@chakra-ui/react';

// Assets
import React from 'react';
import Hailing from './components/Hailing';
import Driver from './components/Driver';

export default function Overview() {
    const textColor = useColorModeValue('secondaryGray.900', 'white');
    return (
        <Box pt={{ base: '130px', md: '80px', xl: '80px' }}>
            <Grid w='100%' px='0px' mt='20px'>
                <Text color={textColor} fontSize='xl' ms='24px' fontWeight='700'>
                    Danh sách tài xế
                </Text>
                <Driver />
            </Grid>

            <Grid w='100%' px='0px' mt='20px'>
                <Text color={textColor} fontSize='xl' ms='24px' fontWeight='700'>
                    Danh sách chuyến đi
                </Text>
                <Hailing />
            </Grid>
        </Box>
    );
}
