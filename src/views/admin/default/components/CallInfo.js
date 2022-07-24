import React from 'react';

import { useColorModeValue } from '@chakra-ui/system';

// Custom components
import Card from 'components/card/Card';
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
import { ArrowForwardIcon } from '@chakra-ui/icons';
import SelectInput from './SelectInput';

const stateOptions = [
    { value: 'AL', label: 'Alabama' },
    { value: 'AK', label: 'Alaska' },
    { value: 'AS', label: 'American Samoa' },
    { value: 'AZ', label: 'Arizona' },
    { value: 'AR', label: 'Arkansas' },
    { value: 'CA', label: 'California' },
    { value: 'CO', label: 'Colorado' },
    { value: 'CT', label: 'Connecticut' },
    { value: 'DE', label: 'Delaware' },
    { value: 'DC', label: 'District Of Columbia' },
    { value: 'FM', label: 'Federated States Of Micronesia' },
    { value: 'FL', label: 'Florida' },
    { value: 'GA', label: 'Georgia' },
    { value: 'GU', label: 'Guam' },
    { value: 'HI', label: 'Hawaii' },
    { value: 'ID', label: 'Idaho' },
    { value: 'IL', label: 'Illinois' },
    { value: 'IN', label: 'Indiana' },
    { value: 'IA', label: 'Iowa' },
    { value: 'KS', label: 'Kansas' },
    { value: 'KY', label: 'Kentucky' },
    { value: 'LA', label: 'Louisiana' },
    { value: 'ME', label: 'Maine' },
    { value: 'MH', label: 'Marshall Islands' },
    { value: 'MD', label: 'Maryland' },
    { value: 'MA', label: 'Massachusetts' },
    { value: 'MI', label: 'Michigan' },
    { value: 'MN', label: 'Minnesota' },
    { value: 'MS', label: 'Mississippi' },
    { value: 'MO', label: 'Missouri' },
    { value: 'MT', label: 'Montana' },
    { value: 'NE', label: 'Nebraska' },
    { value: 'NV', label: 'Nevada' },
    { value: 'NH', label: 'New Hampshire' },
    { value: 'NJ', label: 'New Jersey' },
    { value: 'NM', label: 'New Mexico' },
    { value: 'NY', label: 'New York' },
    { value: 'NC', label: 'North Carolina' },
    { value: 'ND', label: 'North Dakota' },
    { value: 'MP', label: 'Northern Mariana Islands' },
    { value: 'OH', label: 'Ohio' },
    { value: 'OK', label: 'Oklahoma' },
    { value: 'OR', label: 'Oregon' },
    { value: 'PW', label: 'Palau' },
    { value: 'PA', label: 'Pennsylvania' },
    { value: 'PR', label: 'Puerto Rico' },
    { value: 'RI', label: 'Rhode Island' },
    { value: 'SC', label: 'South Carolina' },
    { value: 'SD', label: 'South Dakota' },
    { value: 'TN', label: 'Tennessee' },
    { value: 'TX', label: 'Texas' },
    { value: 'UT', label: 'Utah' },
    { value: 'VT', label: 'Vermont' },
    { value: 'VI', label: 'Virgin Islands' },
    { value: 'VA', label: 'Virginia' },
    { value: 'WA', label: 'Washington' },
    { value: 'WV', label: 'West Virginia' },
    { value: 'WI', label: 'Wisconsin' },
    { value: 'WY', label: 'Wyoming' },
];

export default function CallInfo(props) {
    const textColor = useColorModeValue('secondaryGray.900', 'white');
    const borderColor = useColorModeValue('gray.200', 'whiteAlpha.100');

    const settingPicking = {
        placeholder: 'Chọn/Nhập địa chỉ đón',
        options: stateOptions,
    };
    const settingArriving = {
        placeholder: 'Chọn/Nhập địa chỉ đến',
        options: stateOptions,
    };
    return (
        <Card
            direction='column'
            w='100%'
            px='2%'
            overflowX={{ sm: 'scroll', lg: 'hidden' }}
        >
            <Flex
                zIndex='2'
                direction='column'
                maxW='100%'
                background='transparent'
                borderRadius='15px'
                mx={{ base: 'auto', lg: 'unset' }}
                me='auto'
                mb={{ base: '20px', md: 'auto' }}
            >
                <FormControl>
                    <InputGroup mb='15px' width={'70%'}>
                        <Text
                            width={'20%'}
                            color='green.500'
                            fontSize='md'
                            fontWeight='700'
                            mt='13px'
                            mr='0.5em'
                        >
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
                        />
                    </InputGroup>

                    <FormLabel
                        display='flex'
                        ms='4px'
                        fontSize='md'
                        fontWeight='600'
                        color={textColor}
                        mb='8px'
                    >
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
                        />
                        <Spacer />

                        <FormLabel
                            me='14px'
                            mt='11px'
                            fontSize='md'
                            fontWeight='600'
                            color={textColor}
                            display='flex'
                        >
                            Loại xe
                        </FormLabel>

                        <Select
                            w={'20%'}
                            fontWeight={'bold'}
                            fontSize='md'
                            size='lg'
                            placeholder='Loại xe'
                        >
                            <option value='option1'>Xe 4 chỗ</option>
                            <option value='option2'>Xe 7 chỗ</option>
                        </Select>
                    </Flex>

                    <FormLabel
                        ms='4px'
                        fontSize='md'
                        fontWeight='600'
                        color={textColor}
                        display='flex'
                    >
                        Địa chỉ đón
                    </FormLabel>

                    <SelectInput {...settingPicking} />

                    <FormLabel
                        mt='10px'
                        ms='4px'
                        mb='24px'
                        fontSize='md'
                        fontWeight='600'
                        color='green.500'
                        display='flex'
                    >
                        GPS
                    </FormLabel>

                    <FormLabel
                        ms='4px'
                        fontSize='md'
                        fontWeight='600'
                        color={textColor}
                        display='flex'
                    >
                        Địa chỉ đến
                    </FormLabel>
                    <SelectInput {...settingArriving} />

                    <FormLabel
                        mt='10px'
                        ms='4px'
                        mb='24px'
                        fontSize='md'
                        fontWeight='600'
                        color='green.500'
                        display='flex'
                    >
                        GPS
                    </FormLabel>

                    <ButtonGroup w={'100%'} spacing='6'>
                        <Button
                            fontSize='20px'
                            variant='outline'
                            fontWeight='bold'
                            w='100%'
                            h='50'
                            mb='24px'
                        >
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
                        >
                            Gửi đi
                        </Button>
                    </ButtonGroup>
                </FormControl>
            </Flex>
        </Card>
    );
}
