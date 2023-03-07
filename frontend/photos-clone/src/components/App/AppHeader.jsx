import React from 'react';
import logo from '../../assets/camera-logo.png';
import '../../../App.css'
import {Header, Switch, Group, useMantineTheme, HoverCard, Text, Button,  FileButton} from "@mantine/core";
import {IconSun, IconMoonStars} from '@tabler/icons-react';


export default function AppHeader(props) {


    const theme = useMantineTheme();

    return (
        <Header className="header-container" height={75}>
            <img src={logo} alt="camera logo" className={!props.isDarkMode ? "invert-image" : undefined}/>
            <h1 style={{ color: props.isDarkMode ? "white" : "darkgray"}}>Photos Clone</h1>
            <Group className="add-photos-button">
                <HoverCard width={"PopoverWidth"} openDelay={1000} shadow="md">
                    <HoverCard.Target>
                        <Group>
                            <FileButton type="file"
                                        id="fileUpload"
                                        name="fileUpload"
                                        accept="image/png, image/jpeg"
                                        onChange={(file) => props.handleUploadPhoto(file)}
                                        className="add-photos-input">
                                {(props) => <Button {...props}><span className="enlarge-plus">+</span> Import</Button>}
                            </FileButton>
                        </Group>
                    </HoverCard.Target>
                    <HoverCard.Dropdown>
                        <Text fz="xs">
                            Import photos
                        </Text>
                    </HoverCard.Dropdown>
                </HoverCard>
            </Group>
            <Group>
                <HoverCard width={80} openDelay={1000} shadow="md">
                    <HoverCard.Target>
                        <Group>
                            <Switch
                                onClick={() => props.handleToggle(!props.isDarkMode)}
                                size="md"
                                color={theme.colorScheme === 'dark' ? 'gray' : 'dark.5'}
                                onLabel={<IconSun size={16} stroke={2.5} color={theme.colors.yellow[3]} />}
                                offLabel={<IconMoonStars size={16} stroke={2.5} color={theme.colors.blue[6]} />}
                            />
                        </Group>
                    </HoverCard.Target>
                    <HoverCard.Dropdown>
                        <Text fz="xs">
                            Toggle {props.isDarkMode ? "light" : "dark"} mode
                        </Text>
                    </HoverCard.Dropdown>
                </HoverCard>
            </Group>
        </Header>
    );
}