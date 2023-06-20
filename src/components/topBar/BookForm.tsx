import { Form, FormGroup, FormLabel, FormControl } from "react-bootstrap";
import Offcanvas from 'react-bootstrap/Offcanvas';
import { Book } from '../../models/models';
import { Button } from 'react-bootstrap';

interface IProps {
    show: boolean;
    closeBook: Function;
    book: Book;
    onChangeBook: Function;
    onSubmit: Function;
}

const BookForm = (props: IProps) => {
    return (
        <Offcanvas show={props.show} onHide={() => props.closeBook()} placement="end">
            <Offcanvas.Header closeButton>
                <Offcanvas.Title>Book Form</Offcanvas.Title>
            </Offcanvas.Header>
            <Offcanvas.Body>
                <Form>
                    <FormGroup>
                        <FormLabel>
                            Name
                        </FormLabel>
                        <FormControl
                            type="text"
                            value={props.book.name}
                            placeholder="Enter name"
                            onChange={(e) => props.onChangeBook(e)}
                            name="name"
                        />
                    </FormGroup>
                    <FormGroup>
                        <FormLabel>
                            Author
                        </FormLabel>
                        <FormControl
                            type="text"
                            value={props.book.author}
                            placeholder="Enter Author"
                            onChange={(e) => props.onChangeBook(e)}
                            name="author"
                        />
                    </FormGroup>
                    <FormGroup>
                        <FormLabel>
                            Category
                        </FormLabel>
                        <FormControl
                            type="text"
                            value={props.book.categoryID}
                            placeholder="Enter Category"
                            onChange={(e) => props.onChangeBook(e)}
                            name="categoryID"
                        />
                    </FormGroup>
                    <FormGroup>
                        <FormLabel>
                            Description
                        </FormLabel>
                        <FormControl
                            type="text"
                            value={props.book.description}
                            placeholder="Enter Description"
                            onChange={(e) => props.onChangeBook(e)}
                            name="description"
                        />
                    </FormGroup>
                    <FormGroup>
                        <FormLabel>
                            Price
                        </FormLabel>
                        <FormControl
                            type="text"
                            value={props.book.price}
                            placeholder="Enter Price"
                            onChange={(e) => props.onChangeBook(e)}
                            name="price"
                        />
                    </FormGroup>
                </Form>

                <Button onClick={() => props.onSubmit()}>Save</Button>
            </Offcanvas.Body>
        </Offcanvas>
    );
}

export default BookForm;