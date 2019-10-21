import React from 'react';
import toastr from 'toastr';
import {
    Container,
    ListGroup,
    ListGroupItem,
    Button,
} from 'reactstrap';
import {
    CSSTransition,
    TransitionGroup,
} from 'react-transition-group';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import {
    getItems,
    deleteItem,
} from '../actions/itemActions';
import 'toastr/build/toastr.min.css';

class ShoppingList extends React.Component {

    componentDidMount = () => {
        this.props.getItems();
    };

    onDeleteClick = id => {
        this.props.deleteItem(id);
        toastr.success('Have fun storming the castle!', 'Miracle Max Says')
    };

    render () {
        const { items } = this.props.item;

        return (
            <Container>
                <ListGroup>
                    <TransitionGroup className="shopping-list">
                        {items.map(({_id, name}) => (
                            <CSSTransition
                                key={_id}
                                timeout={500}
                                className="_item"
                            >
                                <ListGroupItem>
                                    <Button
                                        className="remove-btn"
                                        color="danger"
                                        size="sm"
                                        onClick={() => this.onDeleteClick(_id)}
                                    >
                                        &times;
                                    </Button>
                                    {name}
                                </ListGroupItem>
                            </CSSTransition>
                        ))}
                    </TransitionGroup>
                </ListGroup>
            </Container>
        )
    }
};

ShoppingList.propTypes = {
    getItems: PropTypes.func.isRequired,
    item: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
    item: state.item,
});

export default connect(mapStateToProps, { getItems, deleteItem })(ShoppingList);