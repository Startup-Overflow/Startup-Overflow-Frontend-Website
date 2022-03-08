import { Button, Card, Row, Col } from 'react-bootstrap';

function Posts(props){
    return(
      <div>
        <Card className='card'>
        <Card.Body>
        <Row xs={1} sm={2} md={2} lg={2}>
          <Col xs={12} sm={12} md={4} lg={4} >
          {/* //  style={{ width: '18rem' }}> */}
            <Card.Img variant="top" src={props.attachment}/>
            {console.log(props.attachment)}
          </Col>
          <Col xs={12} sm={12} md={8} lg={8}>
            <Card.Title><a href={"/posts/"+props.id}>{props.title}</a></Card.Title>
            <Card.Text>
              {props.desc}
            </Card.Text>
            
            {props.tags.map((value, index) => {
              return <Button style={{margin:'5px'}} variant="secondary">{value}</Button>
            })}
  
          </Col>
          </Row>
        </Card.Body>
        </Card>
      </div>
    )
  }

export default Posts;