import logo from './logo.svg';
import React, { Fragment } from "react";

class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      type: "",
      bucket: "",
      path: "",
      s3Access: "",
      s3Secret: "",
      region: "",
      bbAccount: "",
      bbKey: "",
      spacesName: "",
      spacesSecret: "",
      spacesEndpoint: ""
    };

    this.handleType = this.handleType.bind(this);
    this.handleBucket = this.handleBucket.bind(this);
    this.handlePath = this.handlePath.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);

    //s3
    this.handleS3Access = this.handleS3Access.bind(this);
    this.handleS3Secret = this.handleS3Secret.bind(this);
    this.handleS3Region = this.handleS3Region.bind(this);

    //Backblaze
    this.handleBBAccount = this.handleBBAccount.bind(this);
    this.handleBBKey = this.handleBBKey.bind(this);

    //Digital Ocean Spaces
    this.handleEndpoint = this.handleEndpoint.bind(this);
    this.handleSpacesName = this.handleSpacesName.bind(this);
    this.handleSpacesSecret = this.handleSpacesSecret.bind(this);
  }

  handleType(event){ this.setState({type: event.target.value}); }
  handleBucket(event){ this.setState({bucket: event.target.value}); }
  handlePath(event){ this.setState({path: event.target.value}); }

  //S3
  handleS3Access(event){ this.setState({s3Access: event.target.value}); }
  handleS3Secret(event){ this.setState({s3Secret: event.target.value}); }
  handleS3Region(event){ this.setState({region: event.target.value}); }

  //Backblaze
  handleBBAccount(event){ this.setState({bbAccount: event.target.value}); }
  handleBBKey(event){ this.setState({bbKey: event.target.value}); }

  //Spaces
  handleSpacesName(event){ this.setState({spacesName: event.target.value}); }
  handleSpacesSecret(event){ this.setState({spacesSecret: event.target.value}); }
  handleEndpoint(event){ this.setState({spacesEndpoint: event.target.value}); }

  handleSubmit(event){
    event.preventDefault();
  }

  render() {

    return (
      <div className="App bg-light">
        <div className="container">
          <main>
            <div className="py-5 text-center">
              <img className="d-block mx-auto mb-4" src={logo} alt="" width="72" height="72" />
              <h2>Keep Backups</h2>
              <p className="lead">
                Perform backups daily and syncs every 5 minutes using your selected storage. 
                Backblaze, AWS S3 and Digital Ocean Spaces are currently supported. More coming soon.
              </p>
              <p className="alert alert-info">
              Note: empty folders will not be synced or copied
              </p>
            </div>
            <div className="row g-3">
              <div className="col-12">
                <h4 className="mb-4">Choose Storage Option</h4>
                <form onSubmit={this.handleSubmit}>
                  <div className="row g-3">
                    <select className="form-select" id="storage" required="" onChange={this.handleType}>
                      <option value="">Choose a Storage Option</option>
                      <option value="s3">AWS S3</option>
                      <option value="b2">Backblaze B2</option>
                      <option value="spaces">Digital Ocean Spaces</option>
                    </select>
                    <div className="col-12">
                      <label htmlFor="location" className="form-label">Persistence Folder Location</label>
                      <input type="text" className="form-control" id="location" placeholder="/root/beacon/persistence" required onChange={this.handlePath}/>
                    </div>
                    <div className="col-12">
                      <label htmlFor="bucket" className="form-label">Bucket or Space Name</label>
                      <input type="text" className="form-control" id="bucket" placeholder="my-bucket-name" required onChange={this.handleBucket}/>
                    </div>

                    {(this.state.type === "s3")?
                    <Fragment>
                      <div className="col-12">
                        <label htmlFor="region" className="form-label">Region</label>
                        <input type="text" className="form-control" id="region" placeholder="us-east-1" required onChange={this.handleS3Region} />
                      </div>
                      <div className="col-12">
                        <label htmlFor="access" className="form-label">Access Key Id</label>
                        <input type="text" className="form-control" id="access" placeholder="0123456789" required onChange={this.handleS3Access} />
                      </div>
                      <div className="col-12">
                        <label htmlFor="secret" className="form-label">Secret Access Key</label>
                        <input type="text" className="form-control" id="secret" placeholder="SECRETACCESSKEY" required onChange={this.handleS3Secret} />
                      </div>
                    </Fragment>
                    :
                    null}

                    {(this.state.type === "b2")?
                     <Fragment>
                      <div className="col-12">
                        <label htmlFor="account" className="form-label">Account Id</label>
                        <input type="text" className="form-control" id="account" placeholder="0123456789" required onChange={this.handleBBAccount} />
                      </div>
                      <div className="col-12">
                        <label htmlFor="application" className="form-label">Application Key</label>
                        <input type="text" className="form-control" id="application" placeholder="MYAPPLICATIONKEY" required onChange={this.handleBBKey} />
                      </div>
                    </Fragment>
                    :
                    null}

                    {(this.state.type === "spaces")?
                     <Fragment>
                      <div className="col-12">
                        <label htmlFor="endpoint" className="form-label">Endpoint</label>
                        <input type="text" className="form-control" id="endpoint" placeholder="nyc3.digitaloceanspaces.com" required onChange={this.handleEndpoint} />
                      </div> 
                      <div className="col-12">
                        <label htmlFor="spaceKey" className="form-label">Space Key Name</label>
                        <input type="text" className="form-control" id="spaceKey" placeholder="MYSPACEKEYNAME" required onChange={this.handleSpacesName} />
                      </div>
                      <div className="col-12">
                        <label htmlFor="spaceSecret" className="form-label">Secret</label>
                        <input type="text" className="form-control" id="spaceSecret" placeholder="MYSECRETKEY" required onChange={this.handleSpacesSecret} />
                      </div> 
                    </Fragment>
                    :
                    null}

                    <button className="w-100 btn submit" type="submit">Generate Command</button>
                  </div>
                  <hr className="my-4" />
                  <div className="row g-3">
                    <p>
                      Please copy the command below and run it in the server running your keep beacon or ecdsa node
                    </p>
                    <div className="col-12 generated">
                    {(this.state.type === "s3")?
                      <textarea id="command" readOnly value={`docker run -dit --name backup-keep --mount type=bind,source=${this.state.path},target=/persistence --env BUCKET=${this.state.bucket} --env TYPE=${this.state.type} --env REGION=${this.state.region} --env ACCESS_KEY_ID=${this.state.s3Access} --env SECRET_ACCESS_KEY=${this.state.s3Secret} zyggy/keep-backups`}/>
                      :
                      null
                    }
                    {(this.state.type === "b2" || this.state.type === "")?
                      <textarea id="command" readOnly value={`docker run -dit --name backup-keep --mount type=bind,source=${this.state.path},target=/persistence --env BUCKET=${this.state.bucket} --env TYPE=${this.state.type} --env ACCOUNT=${this.state.bbAccount} --env KEY=${this.state.bbKey} zyggy/keep-backups`}/>
                      :
                      null
                    }
                    {(this.state.type === "spaces")?
                      <textarea id="command" readOnly value={`docker run -dit --name backup-keep --mount type=bind,source=${this.state.path},target=/persistence --env BUCKET=${this.state.bucket} --env TYPE=${this.state.type} --env ENDPOINT=${this.state.spacesEndpoint} --env ACCESS_KEY_ID=${this.state.s3Access} --env SECRET_ACCESS_KEY=${this.state.s3Secret} zyggy/keep-backups`}/>
                      :
                      null
                    }
                    </div>  
                  </div>
                </form>
              </div>
            </div>
          </main>
          <footer className="my-5 pt-5 text-muted text-center text-small">
            <p className="mb-1">&copy; Keep Backups 2020</p>
          </footer>
        </div>
      </div>)  
  }
}

export default App;
