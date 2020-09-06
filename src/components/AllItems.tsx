import React, {useEffect, useState} from 'react';
import {createStyles, makeStyles, Theme} from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';
import axios from 'axios';
import {useQuery} from "react-query";

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            width: '100%',
            maxWidth: '100%',
            backgroundColor: theme.palette.background.paper,
        },
    }),
);

interface Props {
    refresh: () => void,
}

function AllItems(props: Props) {

    const classes = useStyles();
    const apiUrl = process.env.REACT_APP_API_URL || '';
    const [items, setItems] = useState<{ urlLink: string, price: number }[]>([])

    // props.refresh() {
    //     console.log('siin')
    //     return
    // }

    return (
        <div></div>
    );
}

export default AllItems;
