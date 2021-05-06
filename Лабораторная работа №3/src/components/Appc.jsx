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
                <Modal/>
            </div>
        );
    }
}

function Header(props){
    return(
        <div className="container sticky-top"> 
            <div className="row">
                <div className="col">
                    <div className="p-3 mb-2 bg-dark text-white bg-gradient">
                        <h1 className="user-select-none">Харченко Яна ПИ-319</h1>
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
            fR: 'data/datac.xml'
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
            fR: 'data/datac.xml'
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
            alert("Комментарии закончились");
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
            fR: 'data/datac.xml'
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
            fR: 'data/datac.xml'
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
                            <Cdata key={item.id} id={item.id} name={item.name} email={item.email} value={item.value}/>
                        ))}
                        </div>
                        <div className="row align-items-end fixed-bottom" id="buttons">
                        <div className="col-sm-2">
                            <Button handleClick={this.handleClick}/>
                        </div>
                        <div className="col-sm-2">
                            <Nav/>
                        </div>
                        <div className="col-sm-2">
                            <Form/>
                        </div> 
                        </div>
                    </div>
                </div>
            );
        }
    }
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
            </div>
            <div class="row align-items-start">
                <Cname name={props.name}/>
                <Cemail email={props.email}/>
            </div>
            <div class="row align-items-start">
                <Cvalue value={props.value}/>
            </div>
        </div>
    );
}

function Cid(props){
    return (
        <div className="col-sm">
            <h2 className="text-dark user-select-none">
            {`Комментарий №${props.id}  `}
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-chat-left-text" viewBox="0 0 16 16">
                <path d="M14 1a1 1 0 0 1 1 1v8a1 1 0 0 1-1 1H4.414A2 2 0 0 0 3 11.586l-2 2V2a1 1 0 0 1 1-1h12zM2 0a2 2 0 0 0-2 2v12.793a.5.5 0 0 0 .854.353l2.853-2.853A1 1 0 0 1 4.414 12H14a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2z"/>
                <path d="M3 3.5a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 0 1h-9a.5.5 0 0 1-.5-.5zM3 6a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 0 1h-9A.5.5 0 0 1 3 6zm0 2.5a.5.5 0 0 1 .5-.5h5a.5.5 0 0 1 0 1h-5a.5.5 0 0 1-.5-.5z"/>
            </svg>
            </h2>
        </div>
    );
}

function Cname(props){
    return (
        <div className="col-sm">
            <h2 className="text-dark user-select-none">Логин: {props.name}</h2>
        </div>
    );
}

function Cemail(props){
    return (
        <div className="col-sm">
            <h2 className="text-dark user-select-none">
            {`Почта: ${props.email}  `}
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-envelope" viewBox="0 0 16 16">
                <path d="M0 4a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V4zm2-1a1 1 0 0 0-1 1v.217l7 4.2 7-4.2V4a1 1 0 0 0-1-1H2zm13 2.383l-4.758 2.855L15 11.114v-5.73zm-.034 6.878L9.271 8.82 8 9.583 6.728 8.82l-5.694 3.44A1 1 0 0 0 2 13h12a1 1 0 0 0 .966-.739zM1 11.114l4.758-2.876L1 5.383v5.73z"/>
            </svg>
            </h2>
        </div>
    );
}

function Cvalue(props){
    return (
        <div className="col-sm">
            <h3 className="text-dark user-select-none">Комментарий:</h3>
            <p className="text-dark user-select-none">{props.value}</p>
        </div>
    );
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

function Nav(props){
    return (
        <a 
            class="btn btn-dark" 
            href="index.html" 
            role="button"
            data-bs-toggle="tooltip"
            data-bs-placement="bottom"
            title="Посмотреть фильмы"
            >
            Посмотреть фильмы
        </a>);
}

class Form extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            error: null,
            isLoaded: false
        };

    }
    
    componentDidMount(){
        this.setState({
            isLoaded: true
        });
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
                <div>
                    <button 
                        type="button"
                        className="btn btn-dark"
                        data-bs-toggle="tooltip"
                        data-bs-placement="bottom"
                        title="Написать отзыв"
                        data-bs-toggle="modal"
                        data-bs-target="#Modal"
                        >
                        {`Написать отзыв  `}
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-chat-left-text" viewBox="0 0 16 16">
                            <path d="M14 1a1 1 0 0 1 1 1v8a1 1 0 0 1-1 1H4.414A2 2 0 0 0 3 11.586l-2 2V2a1 1 0 0 1 1-1h12zM2 0a2 2 0 0 0-2 2v12.793a.5.5 0 0 0 .854.353l2.853-2.853A1 1 0 0 1 4.414 12H14a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2z"/>
                            <path d="M3 3.5a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 0 1h-9a.5.5 0 0 1-.5-.5zM3 6a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 0 1h-9A.5.5 0 0 1 3 6zm0 2.5a.5.5 0 0 1 .5-.5h5a.5.5 0 0 1 0 1h-5a.5.5 0 0 1-.5-.5z"/>
                        </svg>
                    </button>
                    
                </div>
                
            );
        }
    }
}

class Modal extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            error: null,
            isLoaded: false,
            name: '',
            email: '',
            value: '',
            pR: 0
        };
        this.handleClick = this.handleClick.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }
    
    handleClick(){
        event.preventDefault();
        const {name, email, value, pR} = this.state;
        let bN = false;let bE = false;let bV = false;
        if(!((name.trim().length==="0")||(name.trim()===""))){bN = true;}else{bN = false;}
        if(!((email.trim().length==="0")||(email.trim()===""))&&(email.includes('@'))){bE = true;}else{bE = false;}
        if(!((value.trim().length==="0")||(value.trim()===""))){bV = true;}else{bV = false;}
        if(bN&&bE&&bV==true){
            let jD = {
                fR: 'data/datac.xml'
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
            let jsonData = {
                id: pR,
                name: name,
                email: email,
                value: value,
                xml: 'data/datac.xml'
            };
            console.log(jsonData);
            fetch("/Lab3/src/api/saveXml.php", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json;charset=utf-8'
                }, 
                body: JSON.stringify(jsonData)
            })
            .then(
                (result) => {
                    this.setState({
                        isLoaded: true
                    });
                },
                (error) => {
                    this.setState({
                        isLoaded: true,
                        error
                    });
                }
            )
            alert("Отправлено");
        }else{
            alert("Не отправлено");
        }
    }

    componentDidMount(){
        const{isLoaded, pR} = this.state;
        let jD = {
            fR: 'data/datac.xml'
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
    
    handleChange(event) {
        const target = event.target;
        const name = target.name;
        const value = target.value;
        this.setState({
            [name]: value
        });
    }
    
    render(){
        const{error, isLoaded, name, email, value} = this.state;
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
                <div className="modal fade" id="Modal" tabindex="-1" aria-labelledby="ModalLabel" aria-hidden="true">
                    <div className="modal-dialog modal-dialog-centered">
                        <div className="modal-content">
                            <div className="modal-header p-3 mb-2 bg-dark text-white bg-gradient">
                                <h5 className="modal-title user-select-none" id="ModalLabel">Введите комментарий</h5>
                                <button type="button" className="btn-close btn-close-white" data-bs-dismiss="modal" aria-label="Close"></button>
                            </div>
                            <div className="modal-body">
                                <form autocomplete="off" class="row g-3 needs-validation" onSubmit={this.handleClick}>
                                    <div class="form-floating flex-nowrap mb-3">
                                        <input 
                                            type="text" 
                                            id="name"
                                            name="name"
                                            class="form-control" 
                                            placeholder="Иванов И.И."
                                            required
                                            value={name}
                                            pattern="[A-Za-z]{4,16}"
                                            aria-label="name"
                                            aria-describedby="addon-wrapping"
                                            onChange={this.handleChange}
                                        />
                                        <label for="name">Введите имя пользователя</label>
                                    </div>
                                    <div class="form-floating flex-nowrap mb-3">
                                        <input 
                                            type="email" 
                                            id="email"
                                            name="email"
                                            class="form-control" 
                                            placeholder="name@example.com"
                                            pattern="/^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/"
                                            value={email}
                                            required
                                            aria-label="name"
                                            aria-describedby="addon-wrapping"
                                            onChange={this.handleChange}
                                        />
                                        <label for="email">Введите почту</label>
                                    </div>
                                    <div class="form-floating flex-nowrap mb-3">
                                        <textarea 
                                            class="form-control" 
                                            id="text"
                                            name="value"
                                            value={value}
                                            required
                                            aria-label="With textarea"
                                            placeholder="Комментарий"
                                            onChange={this.handleChange}
                                            >
                                        </textarea>
                                        <label for="text">Введите комментарий</label>
                                    </div>
                                </form>
                            </div>
                            <div className="modal-footer">
                                <button 
                                    type="button" 
                                    className="btn btn-secondary" 
                                    data-bs-dismiss="modal"
                                    >
                                    Закрыть
                                </button>
                                <button 
                                    type="button" 
                                    className="btn btn-dark"
                                    onClick={this.handleClick}
                                    
                                    >
                                    Отправить комментарий
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            );
        }
    }
}

