import React from 'react';
import { Button, Media, Card, CardHeader, CardFooter, CardBody, ButtonGroup } from 'reactstrap';
//import { Link } from 'react-router-dom';
import { Loading } from './LoadingComponent';
import { reduceCartdish } from '../redux/ActionCreators';
import { baseUrl } from '../shared/baseUrl'



function RenderCafe({ cafe }) {
    return (
        <div>
            <div>
            </div>
            <div>
            </div>
        </div>
    );

}

function RenderMenuItem({ dish, reduceCartdish, postCart }) {
    function handlepost() {
        //const body ={
        //   dish_id: dish._id,
        //   cafe_id: dish.cafe_id
        // } ;
        postCart(dish._id, dish.cafe_id);
    };
    function handledelete() {
        reduceCartdish(dish._id);
    };
    return (
        <Media tag="li" className="media-menu row align-items-center mb-1">
            <Media left middle className="col-5 col-sm-4 col-md-3">
                <Media object src={baseUrl + dish.pictureURL} alt="Generic placeholder image" className="menuImage" />
            </Media>
            <Media className="col-7 col-sm-8 col-md-9">
                <Media className="row ml-1">
                    <Media body className="col-12 col-sm-7">
                        <Media heading>
                            {dish.dish_name}
                        </Media>
                        {dish.category}
                    </Media>
                    <Media className="col-12 col-sm-5 ">
                        <ButtonGroup size="lg">
                            <Button onClick={handledelete} outline color="danger"><span className="fa fa-minus fa-lg"> </span></Button>
                            <Button onClick={handlepost} outline color="success"><span className="fa fa-plus fa-lg"> </span></Button>
                        </ButtonGroup>
                    </Media>
                </Media>
            </Media>
        </Media>
    );
}

function RenderCart({ cart }) {

    if (cart.isLoading) {
        return (
            <div className="cartinner">
                <div className="row">
                    <Loading />
                </div>
            </div>
        );
    }
    else if (cart.errMess) {
        return (

            <div className="cartinner">
                <h4>{cart.errMess}</h4>
            </div>

        );
    }
    else {
        if (cart.cart != null) {
            const AddedDish = cart.cart.dishes.map((dish) => {
                return (
                    <div key={dish._id}>
                        <dl className="row p-1">
                            <dt className="col-6">{dish.dish_name}</dt>
                            <dd className="col-6">Quantity: {dish.quantity}</dd>
                        </dl>
                    </div>
                )
            });
            return (
                <div className="cartinner">{AddedDish}</div>
            );
        }
        else return (
            <div className="cartinner">Empty Cart</div>
        )
    }

}

const MenuComponent = (props) => {

    if (props.isLoading) {
        return (
            <div className="container">
                <div className="row">
                    <Loading />
                </div>
            </div>
        );
    }
    else if (props.errMess) {
        return (
            <div className="container">
                <div className="row">
                    <h4>{props.errMess}</h4>
                </div>
            </div>
        );
    }
    else if (props.cafemenu != null) {
        const menu = props.cafemenu.items.map((dish) => {
            return (
                <div key={dish._id}>
                    <RenderMenuItem dish={dish} reduceCartdish={props.reduceCartdish} postCart={props.postCart} />
                </div>
            );
        });
        return (
            <div className="container">
                <div className="row">
                    <div className="col-12 col-sm-7 offset-sm-1 mt-2">
                        {menu}
                    </div>
                    <div className="col-12 col-sm-4 mt-2">
                        <Card>
                            <CardHeader className="bg-success">Cart</CardHeader>
                            <CardBody>
                                <RenderCart cart={props.cart} />
                            </CardBody>
                            <CardFooter className="bg-success">Price {props.cart.cart != null ? props.cart.cart.total_price / 100 : null}</CardFooter>
                        </Card>
                    </div>

                </div>
            </div>
        );
    }
    else return (
        <div>No Dish Found</div>
    );
}

export default MenuComponent;