import { OverflowMenu, MenuItem, TopNavigationAction } from '@ui-kitten/components';
import React from 'react';
import { BackIcon, InfoIcon, LogoutIcon, MenuBarIcon, MenuIcon } from './icons.component';

export const renderRightActions = () => {
    const renderMenuAction = () => (
        <TopNavigationAction icon={MenuIcon} onPress={toggleMenu} />
    );
    const [menuVisible, setMenuVisible] = React.useState(false);

    const toggleMenu = () => {
        setMenuVisible(!menuVisible);
    };

    return (
        <React.Fragment>
            {/* <TopNavigationAction icon={EditIcon}/> */}
            <OverflowMenu
                anchor={renderMenuAction}
                visible={menuVisible}
                onBackdropPress={toggleMenu}>
                <MenuItem accessoryLeft={InfoIcon} title='Setting' />
                <MenuItem accessoryLeft={LogoutIcon} title='Theme' />
                <MenuItem accessoryLeft={LogoutIcon} title='Update' />
                <MenuItem accessoryLeft={LogoutIcon} title='Developer' />
            </OverflowMenu>
        </React.Fragment>
    )
}

export const renderBackAction = () => (
    <TopNavigationAction icon={MenuBarIcon} />
);