import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { Link, Outlet, useParams } from "react-router-dom";
import { VscAccount } from "react-icons/vsc";
import { MdOutlineCreateNewFolder, MdDashboard } from "react-icons/md";
import { Auth, DataStore, Hub } from "aws-amplify";
import { API, graphqlOperation, Storage } from "aws-amplify";
import { FaUserEdit } from "react-icons/fa";
import { Routes, Route, useNavigate } from "react-router-dom";
import {
  creatorDataByQuerryID,
  dataByQuerryID,
  listNotes,
  listProjectApproveds,
  projectApprovedByCreatorID,
} from "../../graphql/queries";
import AnimatedNumber from "animated-number-react";
import { FaPercentage } from "react-icons/fa";
import Log from "/Users/Deepjyoti Bodo/rightcliqnew/src/Images/prf.jpg";
import WorkingActivity from "./WorkingActivity";
const Container = styled.div`
  display: flex;
  padding: 18px;
  width: 100%;
  justify-content: space-between;
`;
const Hr = styled.hr`
  width: 100%;
  margin-top: 80px;
  border: none;
  height: 4px;
  background-color: #d0d0d0;
`;
const Div = styled.div`
  margin: 0px;
  text-align: left;
  display: inline-flex;
  width: 15rem;
  padding-left: 1px;
  flex-direction: column;
`;
const NavLink = styled(Link)`
  font-family: "Montserrat", sans-serif;
  text-decoration: none;
  color: #000;
  font-size: 1.2rem;
  display: flex;
  font-weight: 200;
  cursor: pointer;
  margin-left: 6px;
  margin-right: 6px;
  &:hover {
  }
`;
const Input = styled.input`
  border-radius: 8px;
  width: 300px;
  border-width: 1.6px;
`;
const Div2 = styled.div`
  display: inline-flex;
  justify-content: space-between;
`;
const Wrapper = styled.div`
  height: auto;
  align-items: center;
  display: flex;
  flex-direction: column;
  background-color: #f1f1f1;
`;
const Banner = styled.div`
  border-radius: 8px;
  height: 200px;
  margin-top: 10px;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-left: 70px;
  padding-right: 70px;
  padding-top: 5px;
`;
const H = styled.h2`
  color: #292929;
  font-family: inter;
  font-family: "Montserrat", sans-serif;
  font-size: 4.9rem;
  letter-spacing: 2px;
  margin-bottom: -40px;
`;
const H3 = styled.h2`
  color: #717171;
  font-weight: 370;
  font-size: 2rem;
  font-family: "Inter", sans-serif;
`;
const H2 = styled.p`
  color: #8e8b8b;
  font-weight: bold;
  margin-top: 10px;
  margin-left: 19px;
  font-size: 15px;
  letter-spacing: 1px;
  font-family: "Inter", sans-serif;
  text-decoration: underline;
  text-decoration-color: #646464;
  text-underline-offset: 8px;
  text-decoration-thickness: 0.1em;
`;
const Value = styled.h2`
  color: #000;
  font-weight: bold;
  margin-top: -10px;
  margin-left: 30px;
  font-size: 65px;
  font-family: sans-serif;
`;
const Button = styled(Link)`
  color: #fff;
  width: 160px;
  height: 40px;
  padding-top: 5px;
  padding-bottom: 5px;
  padding-right: 20px;
  margin-top: 0px;
  background-color: #2a2a2a;
  padding-left: 20px;
  border: none;
  font-size: 1rem;
  display: flex;
  align-items: center;
  justify-content: space-around;
  text-decoration: none;
  font-weight: 500;
  border-radius: 10px;
  // &:hover {
  //   background-color: #090167;
  //   color: #fff;
  // }
`;
const CreatorDashboard = () => {
  const { id } = useParams();
  const [image, setImage] = useState("");
  const [data, setData] = useState({});
  const [Ongoing, setOngoing] = useState([]);
  useEffect(() => {
    async function getData() {
      const newtodo = await API.graphql(
        graphqlOperation(creatorDataByQuerryID, {
          QId: id,
        })
      );
      const todo = newtodo?.data?.creatorDataByQuerryID?.items;
      if (todo) {
        todo.map(async (data) => {
          const imageKey = await Storage.get(data.image);
          setImage(imageKey);
          setData(data);
        });
      }
      console.log(newtodo);
    }
    async function getProjectApproved() {
      const newtodo = await API.graphql(
        graphqlOperation(projectApprovedByCreatorID, {
          creatorId: id,
        })
      );
      const todo = newtodo?.data?.projectApprovedByCreatorID?.items;
      if (todo) {
        setOngoing(todo);
        // todo.map((data) => {
        //   setOngoing(data);
        // });
      }
    }
    getProjectApproved();
    getData();
  }, []);

  return (
    <>
      <Wrapper>
        <Banner>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <H>Dashboard</H>
            <H3>Welcome back, Creator {data.fisrtname}!</H3>
          </div>
          <Length>
            {" "}
            <Image src={image ? image : Log} />
            <Linked
              to={`/creatoruser/details/${id}/dashboard/editprofile/${data.id}/`}
            >
              {" "}
              <FaUserEdit size="15" />
              Edit Profile
            </Linked>
          </Length>
        </Banner>
        <Container2>
          <Card>
            <H2>Ongoing Project</H2>
            <Value>
              {" "}
              <AnimatedNumber
                value={Ongoing.length}
                style={{
                  fontSize: "45px",
                }}
                formatValue={(n) => n.toFixed(0)}
                frameStyle={(percentage) =>
                  percentage > 20 && percentage < 80 ? { opacity: 0.5 } : {}
                }
              />
            </Value>
          </Card>
          <Card>
            <H2>Completed Project</H2>
            <Value>0</Value>
          </Card>
          <Card>
            <H2>Pending Approvals</H2>
            <Value>
              <AnimatedNumber
                value="0"
                style={{
                  fontSize: "45px",
                }}
                formatValue={(n) => n.toFixed(0)}
                frameStyle={(percentage) =>
                  percentage > 20 && percentage < 80 ? { opacity: 0.5 } : {}
                }
              />
            </Value>
          </Card>
          <Card>
            <H2>Arriving Soon</H2>
            <Value>
              {" "}
              <AnimatedNumber
                value="0"
                style={{
                  fontSize: "45px",
                }}
                formatValue={(n) => n.toFixed(0)}
                frameStyle={(percentage) =>
                  percentage > 20 && percentage < 80 ? { opacity: 0.5 } : {}
                }
              />
            </Value>
          </Card>
        </Container2>
        <Hr />
        {/* <Container3>
          <Linked to={`/admin/${id}/panel/`}>Submitted Projects</Linked>
          <Linked>For Remark</Linked>
          <Linked>Cancelled</Linked>
        </Container3> */}
        <Container3>
          <WorkingActivity />
        </Container3>
      </Wrapper>
    </>
  );
};

export default CreatorDashboard;
const Length = styled.div`
  display: flex;
  height: auto;
  flex-direction: column;
  z-index: 10;
`;
const Image = styled.img`
  width: 200px;
  height: 200px;
  z-index: 10;
  margin-top: 140px;
  object-fit: cover;
  border-radius: 10px;
`;
const Card = styled.div`
  width: auto;
  height: 100px;
  display: flex;
  padding: 0px;
  margin-right: 30px;
  flex-direction: column;
`;
const Container2 = styled.div`
  display: flex;
  padding: 0px;
  margin: 4px;
  width: 100%;
  background-color: #f1f1f1;
  padding-left: 70px;
  padding-right: 70px;
`;
const Container3 = styled.div`
  display: flex;
  padding: 0px;
  margin: 50px;
  width: 100%;
  padding-left: 70px;
  padding-right: 70px;
  justify-content: space-between;
  background-color: #f1f1f1;
`;
const Linked = styled(Link)`
  text-decoration: none;
  color: #000;
  text-align: center;
  letter-spacing: 1px;
  align-items: center;
  justify-content: center;
  display: flex;
  font-size: 15px;
  margin: 10px;
  font-weight: 600;
  font-family: "Mukta", sans-serif;
`;
