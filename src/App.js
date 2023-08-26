/* src/App.js */
import React, { useEffect, useState } from "react";
import { Amplify, API, graphqlOperation } from "aws-amplify";

import Navbar from "./Components/Navbar";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";
import awsExports from "./aws-exports";
import SignUp from "./Components/SignUp";
import SignIN from "./Components/SignIN";
import Home from "./Components/Home";
import Dashboard from "./Components/Dashboard";
import DashboardPage from "./Components/DashboardPage";
import Create from "./Components/Create";
import Summary from "./Components/Summary";
import Inbox from "./Components/Inbox";
// import Chat from "./Components/Chat";
import NoChat from "./Components/NoChat";
import About from "./Components/About";
import Notification from "./Components/Notification";
import Admin from "./Components/Admin";
import NewUserForm from "./Components/NewUserForm";
import Templates from "./Components/Templates";
import Test from "./Components/Test";
import TemplateList from "./Components/TemplateList";
import TemplateDetail from "./Components/TemplateDetail";
import Err from "./Components/Err";
import AdminLog from "./Components/Admin/AdminLog";
import AdminPanel from "./Components/Admin/AdminPanel";
import AdminDashboard from "./Components/Admin/AdminDashboard";
import Timer from "./Components/Admin/Timer";
import TestPanel from "./Components/Admin/TestPanel";
import SubmittedProjects from "./Components/Admin/SubmittedProjects";
import PendingApprovals from "./Components/Admin/PendingApprovals";
import CreactorList from "./Components/Admin/CreatorPendingDetails";
import ProjectDetails from "./Components/Admin/ProjectDetails";
import AssignApprove from "./Components/Admin/AssignApprove";
import SubmittedProjectsList from "./Components/Admin/SubmittedProjectsList";
import Accepted from "./Components/Accepted";
import Congrats from "./Components/Admin/Congrats";
import Ongoing from "./Components/Admin/Ongoing";
import OngoingDetails from "./Components/Admin/OngoingDetails";
import AdminMessaging from "./Components/Admin/AdminMessaging";
import StartChat from "./Components/Admin/StartChat";
import ChatBox from "./Components/Admin/ChatBox";
import UserMessaging from "./Components/UserMessaging";
import UserChatBox from "./Components/UserChatBox";
import ForgotPassWord from "./Components/ForgotPassWord";
import CreatorList from "./Components/Admin/CreatorList";
import EditProfile from "./Components/EditProfile";
import EditBusiness from "./Components/Admin/EditBusiness";
import CategoryDetail from "./Components/Admin/CategoryDetail";
import EditCategory from "./Components/Admin/EditCategory";
import NewCategory from "./Components/Admin/NewCategory";
import NewTemplate from "./Components/Admin/NewTemplate";
import TemplateDetailAv from "./Components/Admin/TemplateDetailAv";
import EditTemplate from "./Components/Admin/EditTemplate";
import PendingDetails from "./Components/PendingDetails";
import ArrivingDetails from "./Components/ArrivingDetails";
import CreatorLogin from "./Components/Creator/CreatorLogin";
import CreatorDetailForm from "./Components/Creator/CreatorDetailForm";
import UserProvider from "./Components/Creator/UserProvider";
import CreatorPanel from "./Components/Creator/CreatorPanel";
import CreatorDashboard from "./Components/Creator/CreatorDashboard";
import EditPeofile from "./Components/Creator/EditPeofile";
import AdminNotification from "./Components/Admin/AdminNotification";
import CraetorDetails from "./Components/Admin/CreatorDetails";
import CreatorPendingDetails from "./Components/Admin/CreatorPendingDetails";
import CreatorMoreDetails from "./Components/Admin/CreatorMoreDetails";
import AssignCreator from "./Components/Admin/AssignCreator";
import UpdateAssignApprove from "./Components/Admin/UpdateAssignApprove";
import CreatorMessaging from "./Components/Creator/CreatorMessaging";
import CreatorChatBox from "./Components/Creator/CreatorChatbox";
import CreatorNotification from "./Components/Creator/CreatorNotification";
import ProjectReview from "./Components/Creator/ProjectReview";

const App = () => {
  return (
    <>
      <Router>
        <Routes>
          {" "}
          <Route path="/f g t p as s word" element={<ForgotPassWord />} />
          <Route path="/" element={<SignUp />} />
          <Route path="/f g t p as s word" element={<ForgotPassWord />} />
          <Route path="/7bnmsasabjkhaknsjsja/" element={<Accepted />} />
          <Route path="/admin/" element={<Admin />} />
          <Route path="/home" element={<Home />} />
          <Route path="*" element={<Err />} />
          <Route path="/:id/null/" element={<Err />} />
          <Route path="/signin/" element={<SignIN />} />
          <Route path="/test/" element={<Test />} />
          <Route path="/about/" element={<About />} />
          <Route path="/business/:id/" element={<Dashboard />}>
            <Route path="/business/:id/" element={<DashboardPage />} />
            {/* <Route path="/business/:id/inbox" element={<Inbox />}> */}
            <Route path="/business/:id/inbox" element={<UserMessaging />}>
              <Route path="/business/:id/inbox/" element={<StartChat />} />
              <Route
                path="/business/:id/inbox/:uName/:QId/:name/"
                element={<UserChatBox />}
              />
              {/* <Route path="/business/inbox/chat/" element={<Chat />} /> */}
            </Route>
            <Route
              path="/business/:id/projectpendingdetails/:pId/details/"
              element={<PendingDetails />}
            />
            <Route
              path="/business/:id/projectarrivingdetails/:pId/arrivingdetails/"
              element={<ArrivingDetails />}
            />
            <Route
              path="/business/:id/editprofile/:uId/"
              element={<EditProfile />}
            />
            <Route path="/business/:id/create/" element={<Create />} />
            <Route path="/business/:id/templates/" element={<Templates />} />
            <Route
              path="/business/:id/templates/:categoryId/:name/"
              element={<TemplateList />}
            />
            <Route
              path="/business/:id/notification/"
              element={<Notification />}
            />
            <Route
              path="/business/:id/create/summary/:pId"
              element={<Summary />}
            />
          </Route>
          <Route
            path="/business/:id/:categoryId/:name/:tempname/"
            element={<TemplateDetail />}
          />
          ////////////////////////Admin/////////////////////
          <Route path="/admin/login/" element={<AdminLog />} />
          <Route
            path="/admin/t1789010-73bsxssnauy87 hoysghb/"
            element={<Timer />}
          />
          <Route path="/admin/:id/panel/" element={<AdminPanel />}>
            <Route
              path="/admin/:id/panel/editprofile/:uId/"
              element={<EditProfile />}
            />
            <Route
              path="/admin/:id/panel/editbusiness/"
              element={<EditBusiness />}
            ></Route>
            <Route
              path="/admin/:id/panel/editbusiness/:categoryId/"
              element={<CategoryDetail />}
            />
            <Route
              path="/admin/:id/panel/editbusiness/template/:templateId/"
              element={<TemplateDetailAv />}
            />
            <Route
              path="/admin/:id/panel/editbusiness/template/:templateId/edit"
              element={<EditTemplate />}
            />
            <Route
              path="/admin/:id/panel/editbusiness/newCategory/"
              element={<NewCategory />}
            />
            <Route
              path="/admin/:id/panel/editbusiness/newTemplate/"
              element={<NewTemplate />}
            />
            <Route
              path="/admin/:id/panel/editbusiness/:categoryId/edit/"
              element={<EditCategory />}
            />
            <Route path="/admin/:id/panel/" element={<AdminDashboard />}>
              <Route path="/admin/:id/panel/" element={<SubmittedProjects />} />
              {/* <Route path="/admin/:id/panel/" element={<SubmittedProjects/>}/>
            <Route path="/admin/:id/panel/" element={<SubmittedProjects/>}/> */}
            </Route>
            <Route
              path="/admin/:id/panel/343fghzsvxfnotifications/"
              element={<AdminNotification />}
            />
            <Route
              path="/admin/:id/panel/343fghzsvxfdmessaging/"
              element={<AdminMessaging />}
            >
              <Route
                path="/admin/:id/panel/343fghzsvxfdmessaging/"
                element={<StartChat />}
              />
              <Route
                path="/admin/:id/panel/343fghzsvxfdmessaging/:QId/:name/"
                element={<ChatBox />}
              />
            </Route>
            <Route
              path="/admin/:id/panel/343fghzsvxfd/creator/"
              element={<CreatorList />}
            />
            <Route
              path="/admin/:id/panel/343fghzsvxfd/creatorassign/"
              element={<AssignCreator />}
            />
            <Route
              path="/admin/:id/panel/343fghzsvxfd/creator/:cId/details/"
              element={<CreatorMoreDetails />}
            />
            <Route
              path="/admin/:id/panel/343fghzsvxfd ongoings/"
              element={<Ongoing />}
            />
            <Route
              path="/admin/:id/panel/:pId/ongoingdetails/"
              element={<OngoingDetails />}
            />
            <Route
              path="/admin/:id/panel/:pId/ongoingdetails/approve/"
              element={<UpdateAssignApprove />}
            />
            <Route
              path="/admin/:id/panel/343fghzsvxfd p e n d  i ngs/"
              element={<PendingApprovals />}
            >
              <Route
                path="/admin/:id/panel/343fghzsvxfd p e n d  i ngs/"
                element={<SubmittedProjectsList />}
              ></Route>
              <Route
                path="/admin/:id/panel/343fghzsvxfd p e n d  i ngs/c34 r ea t or/"
                element={<CreatorPendingDetails />}
              />
            </Route>
            <Route
              path="/admin/:id/panel/:pId/details/"
              element={<ProjectDetails />}
            />
            <Route
              path="/admin/:id/panel/:CId/creatordetails/"
              element={<CraetorDetails />}
            />
            <Route
              path="/admin/:id/panel/:pId/details/a p r o v e/"
              element={<AssignApprove />}
            />
            <Route
              path="/admin/:id/panel/:pId/details/a p r o v e/congrats/:cId/:creatorId/"
              element={<Congrats />}
            />
          </Route>
          <Route path="/test/admin/" element={<TestPanel />} />
        </Routes>
      </Router>
    </>
  );
};

export default App;
