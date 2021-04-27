import React from "react";
import {Box, Grid} from "@material-ui/core";
import {SearchStudent} from "./SearchStudent";
import {AddUserForm} from "./AddUserForm";
import {UserGrid} from "./UserGrid";
import {hashCode} from "../utils/HashCode";
import {Link, BrowserRouter as Router, Route, Switch} from 'react-router-dom'
import {BottomNavigation, BottomNavigationAction} from "@material-ui/core";
import PersonIcon from '@material-ui/icons/Person';
import PersonAddIcon from '@material-ui/icons/PersonAdd';
import EditIcon from '@material-ui/icons/Edit';
import {EditUser} from "./EditUser";


class App extends React.Component {
  state = {
    navigateTo: 'osoby',
    imieError: false,
    emailError: false,
    isSearching: false,
    open: false,
    imieNazwisko: "",
    email: "",
    opis: "",
    searchNameInput: "",
    codeInput: "",
    codeError: false,
    searchTagInput: [],
    studentList: [
      {
        imieNazwisko: "Arek Architekt",
        email: "send@this.mail",
        opis: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam mauris mauris, rhoncus a turpis eget," +
          " placerat tincidunt sapien.",
        chipList: ["AWS", "Docker", "React"]
      },
      {
        imieNazwisko: "Dagmara Dockerka",
        email: "",
        opis: "",
        chipList: ["AWS", "Docker"]
      },
      {
        imieNazwisko: "Renata Reakcyjna",
        email: "example@mail.info",
        opis: "Fusce quam massa, mollis sit amet facilisis vitae, venenatis suscipit tellus.",
        chipList: []
      },
    ],
    tagsList: ["AWS", "Docker", "React"],
    chipList: [],
    editStudent: null
  }
  handleChange = (event, newValue) => {
    this.setState({navigateTo: newValue})
  };

  handleSearchNameInput = (event) => {
    this.setState({
      searchNameInput: event.target.value
    })
  }

  setChipList = (list) => {
    this.setState({chipList: list})
  }

  setTagSearchList = (list) => {
    this.setState({searchTagInput: list})
  }

  handleImieNazwiskoInput = (event) => {
    this.setState({
      imieNazwisko: event.target.value,
      imieError: false
    })
  }

  handleEmailInput = (event) => {
    this.setState({
      email: event.target.value,
      emailError: false
    })
  }

  handleCodeInput = (event) => {
    this.setState({
      codeInput: event.target.value,
      codeError: false
    })
  }

  handleCodeButton = (event) => {
    if (this.state.codeInput === '') {
      this.setState({codeError: true})
      return
    }

    const student = this.state.studentList.find(it => `${hashCode(it.imieNazwisko)}` === this.state.codeInput)

    if (this.state.studentList.includes(student)) {
      this.setState({
        editStudent: student,
        open: false,
        imieNazwisko: student.imieNazwisko,
        email: student.email,
        opis: student.opis,
        chipList: student.chipList
      })
    } else {
      this.setState({codeError: true})
    }
  }

  handleOpisInput = (event) => {
    this.setState({opis: event.target.value})
  }

  handleIsSearching = (event) => {
    this.setState({
      isSearching: !this.state.isSearching,
      searchNameInput: "",
      searchTagInput: []
    })
  }

  pattern = new RegExp(/^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i);

  handleClose = () => {
    this.setState({open: false})
  };

  handleUsunStudent = () => {
    this.setState({
      studentList: this.state.studentList.filter(it => it.imieNazwisko !== this.state.editStudent.imieNazwisko),
      editStudent: null
    })
  }

  handleEditStudent = () => {
    let items = [...this.state.studentList]
    const index = this.state.studentList.indexOf(this.state.editStudent)
    let item = {...items[index]}

    if (this.state.email === "" || this.pattern.test(this.state.email)) {
      item.email = this.state.email
    } else {
      this.setState({emailError: true})
      return
    }
    item.opis = this.state.opis
    item.chipList = this.state.chipList
    items[index] = item

    this.setState({studentList: items,
    editStudent: null})
  }

  handleZapiszButton = () => {
    if (!this.state.studentList
      .map(it => (it.imieNazwisko))
      .includes(this.state.imieNazwisko) && this.state.imieNazwisko !== "") {
      if (this.state.email === "" || this.pattern.test(this.state.email)) {

      } else {
        this.setState({emailError: true})
        return
      }
      this.setState({
        studentList: this.state.studentList.concat({
          imieNazwisko: this.state.imieNazwisko,
          email: this.state.email,
          opis: this.state.opis,
          chipList: this.state.chipList
        })
      })
      this.setState({
        tagsList: this.state.tagsList.concat(this.state.chipList.filter(it => !this.state.tagsList.includes(it)))
      })

      this.setState({open: true})
    } else
      this.setState({imieError: true})
  }

  render() {
    const listToRender = this.state.studentList
      .filter(it =>
        it.imieNazwisko.toLowerCase().includes(this.state.searchNameInput.toLowerCase())
      )
      .filter(it =>
        this.state.searchTagInput.every(element => it.chipList.includes(element)))
      .map(it => (
        <Grid item key={hashCode(it.imieNazwisko)}>
          <UserGrid vals={it}/>
        </Grid>
      ))
    return (
      <Router>
        <BottomNavigation value={this.state.navigateTo} onChange={this.handleChange} style={{marginBottom: 10}}>
          <BottomNavigationAction component={Link} to="/" label="osoby" value="osoby" icon={<PersonIcon/>}/>
          <BottomNavigationAction component={Link} to="/dodaj" label="dodaj" value="dodaj" icon={<PersonAddIcon/>}/>
          <BottomNavigationAction component={Link} to="/edytuj" label="edytuj" value="edytuj" icon={<EditIcon/>}/>
        </BottomNavigation>

          <Switch>
            <Route exact path='/'>
              <SearchStudent
                tagsList={this.state.tagsList}
                setTagSearchList={this.setTagSearchList}
                onClick={this.handleIsSearching}
                searchNameInput={this.handleSearchNameInput}
              />
              <Box m={1}/>
              <Grid
                container
                direction="column-reverse"
                justify="flex-start"
                alignItems="center"
                spacing={2}
              >
                {listToRender}
              </Grid>
            </Route>
            <Route path='/dodaj'>
              <AddUserForm
                cancelButton={this.changeShowButtonState}
                zapiszButton={this.handleZapiszButton}
                imieNazwiskoInput={this.handleImieNazwiskoInput}
                emailInput={this.handleEmailInput}
                opisInput={this.handleOpisInput}
                imieError={this.state.imieError}
                emailError={this.state.emailError}
                tagsList={this.state.tagsList}
                setChipList={this.setChipList}
                handleClose={this.handleClose}
                open={this.state.open}
                imieNazwisko={this.state.imieNazwisko}
              />
              <Box m={1}/>
              <Grid
                container
                direction="column-reverse"
                justify="flex-start"
                alignItems="center"
                spacing={2}
              >
                {listToRender}
              </Grid>
            </Route>
            <Route path='/edytuj'>
              <EditUser
                codeInput={this.handleCodeInput}
                handleCodeButton={this.handleCodeButton}
                student={this.state.editStudent}
                errorCode={this.state.codeError}
                zapiszButton={this.handleEditStudent}
                emailInput={this.handleEmailInput}
                opisInput={this.handleOpisInput}
                emailError={this.state.emailError}
                tagsList={this.state.tagsList}
                setChipList={this.setChipList}
                usunStudent={this.handleUsunStudent}
                imieNazwisko={this.state.imieNazwisko}
                handleClose={this.handleClose}
              />
            </Route>
          </Switch>
      </Router>
    )
  }
}

export default App;
