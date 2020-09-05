import React, {SyntheticEvent, useState} from 'react';
import InputGroup from 'react-bootstrap/InputGroup';
import FormControl from 'react-bootstrap/FormControl';
import Button from 'react-bootstrap/Button';
import axios from 'axios';

function LinkInput() {
    const apiUrl = process.env.REACT_APP_API_URL || '';
    const [link, setLink] = useState('');
    const [lowestPrice, setLowestPrice] = useState<number>();

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
        const response = await axios.get(apiUrl, {
            params: {
                link: reqUrl,
            }
        });
        setLowestPrice(response.data)
    };

    return (
        <React.Fragment>

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
                    <Button variant="outline-secondary" onClick={submit}>Button</Button>
                </InputGroup.Append>
            </InputGroup>
            {lowestPrice ? `Madalaim hind ${lowestPrice}` : null}
        </React.Fragment>
    );
}

export default LinkInput;
