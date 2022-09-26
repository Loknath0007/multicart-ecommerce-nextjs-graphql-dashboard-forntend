import React, { Fragment } from "react";
import Breadcrumb from "../common/breadcrumb";
import data from "../../assets/data/orders";
import Datatable from "../common/datatable";
import { Card, CardBody, CardHeader, Col, Container, Row } from "reactstrap";
import { gql, useQuery } from "@apollo/client";
import OrderTable from "./orderTable";
import Image from "../common/image";

const GET_ORDERS = gql`
  query getOrders {
    getOrders {
      firstName
      lastName
      firstName
      lastName
      createdAt
      orderID
      paymentMethod
      cartTotal
      cartItems {
        variants {
          image
        }
      }
    }
  }
`;
const Orders = () => {
  var { loading, data } = useQuery(GET_ORDERS, {});

  var mydata;
  console.log("data:", data?.getOrders);
  if (data) {
    const info = data.getOrders;
    mydata = info.map((e) => {
      const data = {
        oder_id: e.orderID,
        image: (
          <Image
            id="image1"
            data={e.cartItems.map((cItems) => cItems.variants)}
          />
        ),
        status: <span className="badge badge-secondary">Cash On Delivery</span>,
        payment_method: e.paymentMethod,
        order_status: <span className="badge badge-success">Delivery</span>,
        date: e?.createdAt?.split("T")[0],
        total: `$ ${e.cartTotal}`,
      };
      return data;
    });
    console.log("mydata:", mydata);
  }
  return (
    <Fragment>
      <Breadcrumb title="Orders" parent="Sales" />

      <Container fluid={true}>
        <Row>
          <Col sm="12">
            <Card>
              <CardHeader>
                <h5>Manage Order</h5>
              </CardHeader>
              <CardBody>
                {data && data.getOrders && (
                  //   <div>
                  //     <table class="table table-striped">
                  //       <thead>
                  //         <tr>
                  //           <th scope="col">Order_id</th>
                  //           <th scope="col">Images</th>
                  //           <th scope="col">status</th>
                  //           <th scope="col">payment_method</th>
                  //           <th scope="col">order_status</th>
                  //           <th scope="col">date</th>
                  //           <th scope="col">total</th>
                  //         </tr>
                  //       </thead>
                  //       {/* <tr>
                  //         <th scope="row">{mydata[0].orderID}</th>
                  //         <td>{mydata[0].firstName}</td>
                  //         <td>{mydata[0].status}</td>
                  //         <td>{mydata[0].paymentMethod}</td>
                  //         <td>{mydata[0].order_status}</td>
                  //         <td>{mydata[0].order_status}</td>
                  //         <td>$ {mydata[0].cartTotal}</td>
                  //       </tr> */}

                  //       <tbody>
                  //         {mydata.map((data, i) => (
                  //           <tr key={i}>
                  //             <th scope="row">***{data.orderID.slice(-3)}</th>
                  //             <td>adf</td>
                  //             <td>{data.paymentMethod}</td>
                  //             <td>{data.paymentMethod}</td>
                  //             <td>@mdo</td>
                  //             <td>@mdo</td>
                  //             <td>$ {data.cartTotal}</td>
                  //           </tr>
                  //         ))}
                  //       </tbody>
                  //     </table>
                  //   </div>
                  <Datatable
                    multiSelectOption={false}
                    myData={mydata}
                    pageSize={10}
                    pagination={true}
                    class="-striped -highlight"
                  />
                )}
              </CardBody>
            </Card>
          </Col>
        </Row>
      </Container>
    </Fragment>
  );
};

export default Orders;
