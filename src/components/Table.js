import React ,{Component} from "react"
import GenericTable from "../utils/GenericTable"

export default class Table extends Component {
    constructor(props) {
      super(props)
      this.state = { data: [] }
    }
    
    async componentDidMount(){
      await this.update()
    }
  
    update = async () => {
      var data = await this.props.facade.getAll()
      this.setState({data})
    }
  
    render() {
      return (
        <>
        <h1>Table</h1>
          <GenericTable data={this.state.data} idName="id" facade={this.props.facade} update={this.update} remove edit />
        </>
      )
    }
  }