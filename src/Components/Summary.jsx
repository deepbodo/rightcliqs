import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useNavigate, useParams, Link, Navigate } from "react-router-dom";
import { AiOutlineRollback } from "react-icons/ai";
import { API, graphqlOperation } from "aws-amplify";
import {
  dataByQuerryID,
  projectByProjectID,
  projectByUserID,
  templateByTemplateID,
} from "../graphql/queries";

import HashLoader from "react-spinners/HashLoader";
import { deleteNote } from "../graphql/mutations";
const Container = styled.div`
  display: flex;
  width: 100%;
  padding: 40px;
  background-color: #f1f1f1;
  flex-direction: column;
`;
const Summary = () => {
  const nav = useNavigate();
  const { id, pId } = useParams();
  const [Id, setId] = useState();
  const [user, setUserDetails] = useState({});
  const [showLoader, setShowLoader] = useState(false);
  const [project, setProjectDetails] = useState({});
  const [data, setData] = useState();
  const [template, setTemplate] = useState({});
  useEffect(() => {
    API.graphql(
      graphqlOperation(dataByQuerryID, {
        QId: id,
      })
    ).then((response) => {
      const items = response?.data?.dataByQuerryID?.items;
      if (items.length !== 0) {
        items.map((item) => {
          setUserDetails(item);
        });
      }
    });
  }, []);
  useEffect(() => {
    API.graphql(
      graphqlOperation(projectByProjectID, {
        id: pId,
      })
    ).then((response) => {
      const items = response?.data?.projectByProjectID?.items;
      if (items.length !== 0) {
        items.map((item) => {
          setProjectDetails(item);
          setData(item.templateId);
          fetchTemplate(data);
        });
      } else {
        nav(`/${id}/null/`);
      }
    });
  }, []);
  function fetchTemplate(data) {
    API.graphql(
      graphqlOperation(templateByTemplateID, {
        templateId: `${data}`,
      })
    ).then((response) => {
      const items = response?.data?.templateByTemplateID?.items;
      items.map((item) => {
        setTemplate(item);
      });
    });
  }
  function onClick() {}
  const deleteProject = () => {
    const todoDetails = {
      id: pId,
    };

    const deleted = API.graphql({
      query: deleteNote,
      variables: { input: todoDetails },
    });
    if (deleted) {
      Navigate();
    }
  };
  function Navigate() {
    nav(`/home/`);
  }
  useEffect(() => {
    setShowLoader(true);
    setTimeout(() => {
      setShowLoader(false);
    }, 2000);
  }, []);
  return (
    <>
      {/* {showLoader ? (
        <ContainerCenter>
          {" "}
          <HashLoader size={50} color="#00e6e6" />
        </ContainerCenter>
      ) : ( */}
      <Container>
        <H>Review Your Orders</H>
        <Div>
          <H2>ORDER SUMMARY</H2>
          <H2>QUANTITY</H2>
          <H2>ITEM TOTAL</H2>
        </Div>
        <Line />
        <Div>
          <H22>ORDER SUMMARY</H22>
          <H3>1 </H3>
          <H2></H2>
        </Div>
        <Div>
          <H22>TOTAL TAX & CHARGES</H22>
          <H3>₹999</H3>
          <H2></H2>
        </Div>
        <Div>
          <H22>TOTAL TAX & CHARGES</H22>
          <H3>₹999</H3>
          <H2></H2>
        </Div>
        <H>Billing Information</H>
        <Div2>
          {/* <Label> Category</Label> */}
          <Input placeholder="Registered Company name" />
        </Div2>
        <Div2>
          {/* <Label> Category</Label> */}
          <Input placeholder="Address" />
        </Div2>
        <Div2>
          {/* <Label> Category</Label> */}
          <Input placeholder="State" />
        </Div2>{" "}
        <Div2>
          {/* <Label> Category</Label> */}
          <Input placeholder="Pin Code" />
        </Div2>{" "}
        <Div3>
          <Button to={"/7bnmsasabjkhaknsjsja/"}>MAKE PAYMENT</Button>
        </Div3>
      </Container>
      {/* )} */}
    </>
  );
};

export default Summary;

const H = styled.h2`
  color: #292929;
  font-family: "Montserrat", sans-serif;
  font-size: 2.3rem;
  letter-spacing: 2px;
  margin-top: 30px;
  margin-left: 40px;
  margin-bottom: -30px;
`;
const Div = styled.div`
  display: flex;
  padding: 20px;
  width: 100%;
  text-align: center;
  align-items: center;
  justify-content: space-between;
`;
const Div3 = styled.div`
  display: flex;
  padding: 20px;
  width: 100%;
  text-align: center;
  align-items: center;
`;
const H2 = styled.h3`
  color: #292929;
  font-weight: 500;
  font-size: 1.9rem;
  letter-spacing: 2px;
  margin-left: 20px;
  margin-right: 20px;
  margin-bottom: -20px;
`;
const H22 = styled.h3`
  color: #292929;
  font-weight: 500;
  font-size: 1.6rem;
  letter-spacing: 1.6px;
  margin-left: 20px;
  margin-right: 20px;
  margin-bottom: -20px;
`;
const H3 = styled.h3`
  color: #292929;
  font-weight: 500;
  font-size: 1.9rem;
  text-align: center;
  letter-spacing: 2px;
  margin-right: 180px;
  margin-bottom: -20px;
`;
const Line = styled.div`
  width: 100%;
  height: 4px;
  background-color: #646464;
`;
const Input = styled.input`
  border-radius: 10px;
  height: auto;
  margin: 10px;
  width: 400px;
  border: none;
  padding: 4px;
  padding-left: 15px;
  font-size: 1.3rem;
  text-align: left;
  background-color: #9b9b9b;
`;
const Div2 = styled.div`
  display: flex;
  width: 50%;
  justify-content: space-between;
  margin-left: 40px;
  margin-top: 40px;
  margin-bottom: -20px;
  align-items: center;
`;
const Label = styled.label`
  width: 30%;
  text-align: left;
  font-size: 1.2rem;
  color: #676767;
  font-family: "Montserrat", sans-serif;
  letter-spacing: 2px;
`;
const Button = styled(Link)`
  font-family: "Ubuntu", sans-serif;
  color: #fff;
  width: auto;
  padding: 8px;
  align-items: center;
  text-decoartion: none;
  display: flex;
  justify-content: center;
  background-color: #e88485;
  font-size: 1.2rem;
  border: none;
  font-weight: 500;
  margin: auto;
  border-radius: 15px;
  pointer: cursor;
  &:hover {
    background-color: #e88485;
    color: #000;
  }
`;
