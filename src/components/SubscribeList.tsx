import React from 'react';
import axios from 'axios';
import {useQuery} from "react-query";
import {createStyles, ListItemProps, Theme} from "@material-ui/core";
import {makeStyles} from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import ListItemText from "@material-ui/core/ListItemText";
import Divider from "@material-ui/core/Divider";
import {getHeaders} from "../helpers/getHeaders";
import IconButton from "@material-ui/core/IconButton";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import DeleteIcon from '@material-ui/icons/Delete';
import Button from "@material-ui/core/Button";

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            width: '100%',
            // maxWidth: '100%',
            backgroundColor: theme.palette.background.paper,
        },
    }),
);

function ListItemLink(props: ListItemProps<'a', { button?: true }>) {
    return <ListItem button component="a" {...props} />;
}

function SubscribeList() {
    const classes = useStyles();

    const apiUrl = process.env.REACT_APP_API_URL || 'http://localhost:5000';

    const usePosts = () => {
        return useQuery("posts", async () => {
            const {data} = await axios.get(
                `${apiUrl}/item`,
                {
                    headers: {
                        'Authorization': `Bearer ${getHeaders()}`,
                    },
                }
            );
            return data;
        });
    }

    const {data: items, refetch} = usePosts();

    const removeItem = async (itemId) => {
        console.log('e ', itemId)
        // make request to api with url as queryparam pasted by user
        await axios.delete(`${apiUrl}/item/${itemId}`,{
                headers: {
                    'Authorization': `Bearer ${getHeaders()}`
                }
            }
        );
        refetch();
    };

    return (
        <React.Fragment>

            <div className={classes.root}>
                <List component="nav" aria-label="main mailbox folders">

                    {items && items.map((item, i) => {
                        return (
                            <ListItem key={item.id}>
                                <ListItemAvatar>
                                    <Avatar alt={item.name} src={item.imageUrl}/>
                                </ListItemAvatar>
                                <ListItemLink href={item.urlLink}>
                                    <ListItemText
                                        primary={item.name}
                                        secondary={`${item.price}€`}
                                    />
                                </ListItemLink>
                                <ListItemSecondaryAction onClick={() => removeItem(item.id)}>
                                    <IconButton edge="end" aria-label="delete">
                                        <DeleteIcon/>
                                    </IconButton>
                                </ListItemSecondaryAction>
                            </ListItem>
                        )
                    })}
                </List>
                <Divider/>
            </div>

        </React.Fragment>
    );
}

export default SubscribeList;
