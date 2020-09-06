import React, {SyntheticEvent, useEffect, useState} from 'react';
import InputGroup from 'react-bootstrap/InputGroup';
import FormControl from 'react-bootstrap/FormControl';
import Button from 'react-bootstrap/Button';
import axios from 'axios';

function LinkInput() {
    const localStoreKey = 'prices';
    const apiUrl = process.env.REACT_APP_API_URL || '';
    const [link, setLink] = useState('');
    const [lowestPrice, setLowestPrice] = useState<number>();

    const [localPrices, setLocalPrices] = useState<{ item: string, price: number }[]>([]);

    useEffect(() => {
        // get items from localstorage
        // // getter
        const localPricesString = localStorage.getItem(localStoreKey) || ' ';
        console.log('localPricesString ', localPricesString)

        try {
            const local = JSON.parse(localPricesString || ' ');
            setLocalPrices(local)
        } catch {

        }

    }, []);

    const submit = (e: SyntheticEvent) => {
        e.preventDefault();

        // feth page with that link
        fethHVPage(link);
    }

    const onInput = (e: React.ChangeEvent<HTMLInputElement>) => {
        // set link
        setLink(e.target.value);
    }

    const fethHVPage = async (reqUrl: string) => {
        // make request to api with url as queryparam pasted by user
        const response = await axios.get(`${apiUrl}/item`, {
            params: {
                link: reqUrl,
            }
        });
        setLowestPrice(response.data)


        // check if current item with provided link is included in local storage
        const itemPresent = localPrices.find((i) => {
            console.log('i.item  ', i.item)
            console.log('link ', link)
            return i.item === link
        });

        console.log('itemPresent ', itemPresent)

        if (!itemPresent) {
            console.log('peaks lisama')
            const currentItem = {
                item: link,
                price: response.data,
            }

            const newArr = [...localPrices, currentItem];

            localStorage.setItem(localStoreKey, JSON.stringify(newArr))

        }

    };

    return (
        <React.Fragment>
            {/*localprices*/}
            {/*{localPrices.map((i) => {*/}
            {/*    return (*/}
            {/*        <li key={i.item}>*/}
            {/*            {i.item}*/}
            {/*            <br/>*/}
            {/*            <b>*/}
            {/*                vana hind {i.price}*/}
            {/*            </b>*/}
            {/*        </li>*/}
            {/*    )*/}
            {/*})}*/}

            {/*<br/>*/}

            Pasteeri HV link siia
            <InputGroup className="mb-3">
                <FormControl
                    placeholder="HV link"
                    aria-label="Recipient's username"
                    aria-describedby="basic-addon2"
                    value={link}
                    onChange={onInput}
                />
                <InputGroup.Append>
                    <Button variant="outline-secondary" onClick={submit}>Check price</Button>
                </InputGroup.Append>
            </InputGroup>
            {lowestPrice ? `Madalaim hind ${lowestPrice}` : null}
        </React.Fragment>
    );
}

export default LinkInput;
