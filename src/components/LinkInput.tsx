import React, {ChangeEvent, SyntheticEvent, useEffect, useState} from 'react';
import axios from 'axios';
import {trim} from 'lodash'
import {useQuery} from "react-query";
import {useForm} from "react-hook-form";
import {createStyles, TextField, Theme, Typography} from "@material-ui/core";
import {makeStyles} from "@material-ui/core/styles";
import Button from '@material-ui/core/Button';
import AllItems from "./AllItems";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import Divider from "@material-ui/core/Divider";

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            flexWrap: 'wrap',
            '& > *': {
                margin: theme.spacing(1),
                width: '100%',
            },
        },
    }),
);

const useStyles2 = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            width: '100%',
            // maxWidth: '100%',
            backgroundColor: theme.palette.background.paper,
        },
    }),
);

const useStyles3 = makeStyles({
    root: {
        width: '100%',
        // maxWidth: 500,
    },
});

function LinkInput() {
    const classes = useStyles();
    const classes2 = useStyles2();
    const classes3 = useStyles3();
    const apiUrl = process.env.REACT_APP_API_URL || '';

    const usePosts = () => {
        return useQuery("posts", async () => {
            const {data} = await axios.get(
                `${apiUrl}/item`
            );
            return data;
        });
    }

    const {status, data: items, error, isFetching, refetch} = usePosts();

    const {register, handleSubmit, watch, errors} = useForm();

    const [link, setLink] = useState('');
    const [lowestPrice, setLowestPrice] = useState<number>();

    const checkPrice = (e: SyntheticEvent) => {
        // e.preventDefault();
        //todo: validate link

        // feth page with that link
        fethHVPage(link);
    }

    const onInput = (e: React.ChangeEvent<HTMLInputElement>): void => {
        // set link
        setLink(trim(e.target.value));
    }

    const fethHVPage = async (reqUrl: string) => {
        // make request to api with url as queryparam pasted by user
        const response = await axios.post(`${apiUrl}/item`, {
            link: reqUrl,
        });
        console.log('done')
        refetch();
        setLowestPrice(response.data)
    };

    return (
        <React.Fragment>
            <div className={classes3.root}>
                <Typography variant="h4" component="h2" gutterBottom>
                    Add HV item to watchlist and receive email when price lowers
                </Typography>
            </div>

            <div>
                <form className={classes.root} noValidate autoComplete="off">
                    <TextField
                        id="exampleRequired"
                        name={"exampleRequired"}
                        label="Paste HV link"
                        variant="outlined"
                        onChange={onInput}
                        inputRef={register({required: true})}
                        error={errors.exampleRequired}
                        helperText={errors.exampleRequired ? 'This field is required' : null}
                    />
                    <br/>
                    <Button variant="contained" color="primary" onClick={handleSubmit(checkPrice)}>
                        Add item
                    </Button>
                </form>
            </div>


            {lowestPrice ? `Madalaim hind ${lowestPrice}` : null}
            <div className={classes2.root}>
                <List component="nav" aria-label="main mailbox folders">
                    {items && items.map((item, i) => {
                        return (
                            <React.Fragment>
                                <ListItem>
                                    <ListItemText
                                        primary={item.urlLink}
                                        secondary={item.price}
                                    />
                                </ListItem>
                                {items.length === i + 1 ? null : <Divider variant="fullWidth" component="li"/>}
                            </React.Fragment>
                        )
                    })}
                </List>
                <Divider/>
            </div>
        </React.Fragment>
    );
}

export default LinkInput;
