class App extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            
        };
    }
    
    render(){
        return(
            <div class="app" id="app">
                <Header/>
                <Content/>
            </div>
        );
    }
}

function Nav(props){
    return (
        <a 
            class="btn btn-dark" 
            href="com.html" 
            role="button"
            data-bs-toggle="tooltip"
            data-bs-placement="bottom"
            title="Оставьте отзыв"
            >
            Оставить отзыв
        </a>);
}

function Header(props){
    return(
        <div className="container sticky-top"> 
            <div className="row">
                <div className="col">
                    <div className="p-3 mb-2 bg-dark text-white bg-gradient">
                        <h1 className="user-select-none">Сериалы</h1>
                    </div>
                </div>
            </div>
        </div>
    );
}

class Content extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            error: null,
            isLoaded: false,
            items: [],
            cR: 5,
            sR: 0,
            eR: 5,
            pR: 0
        };
        this.handleClick = this.handleClick.bind(this);
    }
    
    handleClick(){
        const{error, isLoaded, eR, cR, sR, pR} = this.state;
        this.setState({
            eR: (eR+cR)
        });
        let jsonData = {
            sR: sR,
            eR: eR,
            fR: 'data/data.xml'
        };
        fetch("/Lab3/src/api/loadXml.php", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json;charset=utf-8'
            }, 
            body: JSON.stringify(jsonData)
        })
        .then(response => response.json())
        .then(
            (result) => {
                this.setState({
                    isLoaded: true,
                    items: result
                });
            },
            (error) => {
                this.setState({
                    isLoaded: true,
                    error
                });
            }
        )
        let jD = {
            fR: 'data/data.xml'
        };
        fetch("/Lab3/src/api/loadLength.php", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json;charset=utf-8'
            }, 
            body: JSON.stringify(jD)
        })
        .then(response => response.json())
        .then(
            (result) => {
                this.setState({
                    isLoaded: true,
                    pR: result
                });
            },
            (error) => {
                this.setState({
                    isLoaded: true,
                    error
                });
            }
        )
        if(eR>pR){
            alert("Сериалы будут добавляться!!!");
        }
    }
    
    componentDidMount(){
        const{error, isLoaded, eR, cR, sR, pR} = this.state;
        this.setState({
            eR: (eR+cR)
        });
        let jsonData = {
            sR: sR,
            eR: eR,
            fR: 'data/data.xml'
        };
        fetch("/Lab3/src/api/loadXml.php", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json;charset=utf-8'
            }, 
            body: JSON.stringify(jsonData)
        })
        .then(response => response.json())
        .then(
            (result) => {
                this.setState({
                    isLoaded: true,
                    items: result
                });
            },
            (error) => {
                this.setState({
                    isLoaded: true,
                    error
                });
            }
        )
        let jD = {
            fR: 'data/data.xml'
        };
        fetch("/Lab3/src/api/loadLength.php", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json;charset=utf-8'
            }, 
            body: JSON.stringify(jD)
        })
        .then(response => response.json())
        .then(
            (result) => {
                this.setState({
                    isLoaded: true,
                    pR: result
                });
            },
            (error) => {
                this.setState({
                    isLoaded: true,
                    error
                });
            }
        )
    }
    
    render(){
        const{error, isLoaded, items} = this.state;
        if (error) {
            return(
                <Error error={error.message}/>
            );
        } 
        else if (!isLoaded) {
            return <Load/>;
        }
        else{
            return(
                <div className="container">
                    <div class="p-3 mb-2 bg-light text-dark bg-gradient">
                        <div className="row align-items-center" id="content">
                        {items.map(item => (
                            <Cdata key={item.id} id={item.id} title={item.title} picture={item.picture} value={item.value}/>
                        ))}
                        </div>
                        <div className="row align-items-end fixed-bottom" id="buttons">
                        <div className="col-sm-2">
                            <Button handleClick={this.handleClick}/>
                        </div>
                        <div className="col-sm-2">
                            <Nav/>
                        </div>
                        </div>
                    </div>
                </div>
            );
        }
    }
}

function Button(props){
    return(
        <button
            type="button"
            className="btn btn-dark"
            onClick={props.handleClick}
            data-bs-toggle="tooltip"
            data-bs-placement="bottom"
            title="Загрузить еще 5 элементов"
            >
            <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
            <span className="visually-hidden">Загрузка...</span>
            Загрузить еще
        </button>
    );
}

function Error(props){
    return(
        <div className="container" id="content">
            <div className="d-flex justify-content-center">
                <strong>Ошибка: {props.error}</strong>
                <div class="spinner-border spinner-border-sm text-danger" role="status">
                    <span class="visually-hidden">Загрузка...</span>
                </div>
            </div>  
        </div>
    );
}

function Load(props){
    return(
        <div className="container" id="content">
            <div className="d-flex justify-content-center">
                <div className="spinner-border text-success" role="status">
                    <span className="visually-hidden">Загрузка...</span>
                </div>
            </div>  
        </div>
    );
}

function Cdata(props){
    return (
        <div className="container-sm">
            <div class="row align-items-start">
                <Cid id={props.id}/>
                <Ctitle title={props.title}/>
            </div>
            <div class="row align-items-start">
                <Cpicture picture={props.picture}/>
                <Cvalue value={props.value}/>
            </div>
        </div>
    );
}

function Cid(props){
    return <div className="col-sm-5"> <h2 className="text-dark user-select-none">{``} </h2></div>;
}

function Ctitle(props){
    return <div className="col-sm-5"> <h2 className="text-dark user-select-none">{props.title}</h2></div>;
}

function Cpicture(props){
    return <div className="col-sm-5"> <img className="rounded" src={`${props.picture}`} width="384" height="384" alt="..."/></div>;
}

function Cvalue(props){
    return <div className="col-sm-5"> <h3 className="text-dark user-select-none">Описание:</h3><p className="text-dark user-select-none">{props.value}</p></div>;
}
