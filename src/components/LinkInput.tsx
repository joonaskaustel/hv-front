import React, {SyntheticEvent, useState} from 'react';
import axios from 'axios';
import {trim} from 'lodash'
import {useQuery} from "react-query";
import {useForm} from "react-hook-form";
import {createStyles, TextField, Theme, Typography} from "@material-ui/core";
import {makeStyles} from "@material-ui/core/styles";
import Button from '@material-ui/core/Button';
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import Divider from "@material-ui/core/Divider";
import {isEmpty} from 'lodash'
import useInterval from '@use-it/interval';

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
    const apiUrl = process.env.REACT_APP_API_URL || 'http://localhost:5000';

    useInterval(async () => {
        // poll api
        const req = await axios.get(`${apiUrl}/`);
        console.log('req', req.data)
    }, 1200000); // 20 minutes, heroku will sleep in 30

    const usePosts = () => {
        return useQuery("posts", async () => {
            const {data} = await axios.get(
                `${apiUrl}/item`
            );
            return data;
        });
    }

    const { data: items, refetch} = usePosts();

    const {register, handleSubmit, errors} = useForm({mode: "onChange"});

    const [link, setLink] = useState('');
    const [lowestPrice, setLowestPrice] = useState<number>();

    const checkPrice = (e: SyntheticEvent) => {
        // e.preventDefault();

        // feth page with that link
        fethHVPage(link);
    }

    const onInput = (e: React.ChangeEvent<HTMLInputElement>): void => {
        console.log('errors;: ', errors)
        console.log('errors;: ', isEmpty(errors))
        setLink(trim(e.target.value));
    }

    const getHeaders = () => {
        const local = JSON.parse(localStorage?.getItem('user') || '');
        if (local) {
            return local.token;
        }
        return ''
    }

    const fethHVPage = async (reqUrl: string) => {
        // make request to api with url as queryparam pasted by user
        const response = await axios.post(`${apiUrl}/item`, {
            link: reqUrl,
        }, { headers: {
            'Authorization': `Bearer ${getHeaders()}`
            } });
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
                        id="linkInput"
                        name={"linkInput"}
                        label="Paste HV link"
                        variant="outlined"
                        onChange={onInput}
                        inputRef={register({required: true, pattern: /https:\/\/www.hinnavaatlus.ee\/[0-9]*\/[a-zA-Z-0-9]*\/$/i })}
                        error={errors.linkInput}
                        helperText={errors.linkInput ? 'This field is not valid HV link. Copy exact link: eg. https://www.hinnavaatlus.ee/1668162/apple-airpods-pro/' : null}
                    />
                    <br/>
                    <Button variant="contained" color="primary" onClick={handleSubmit(checkPrice)} disabled={link.length > 0 ? !isEmpty(errors) : true}>
                        Add item
                    </Button>
                </form>
            </div>

            {lowestPrice}

            <div className={classes2.root}>
                <List component="nav" aria-label="main mailbox folders">
                    {items && items.map((item, i) => {
                        return (
                            <React.Fragment key={item.id}>
                                <ListItem>
                                    <ListItemText
                                        primary={item.urlLink}
                                        secondary={`${item.price}€`}
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
