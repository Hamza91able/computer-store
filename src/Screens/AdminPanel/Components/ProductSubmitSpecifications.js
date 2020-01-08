import React from 'react';
import { Editor } from '@tinymce/tinymce-react';

class ProductSubmitOverview extends React.Component {

    state = {
        specifications: '',
    }

    handleEditorChange = (e) => {
        this.setState({
            specifications: e.target.getContent()
        }, () => {
            this.props.setSpecifications(this.state.specifications);
        })
        // console.log('Content was updated:', e.target.getContent());
    }

    render() {
        return (
            <Editor
                initialValue=""
                apiKey='vburs9irycexcndf4dnapvb4jck2vsglmqru6w7s2oysv6tk'
                init={{
                    height: 500,
                    // menubar: false,
                    plugins: [
                        'advlist autolink lists link image charmap print preview anchor',
                        'searchreplace visualblocks code fullscreen',
                        'insertdatetime media table paste code help wordcount'
                    ],
                    toolbar:
                        'undo redo | formatselect | table | bold italic backcolor | fontSelect | fontSizeSelect | \
                        image | alignleft aligncenter alignright alignjustify | \
                        bullist numlist outdent indent | removeformat | help' ,
                    menubar: "insert",
                }}
                onChange={this.handleEditorChange}
            />
        );
    }
}

export default ProductSubmitOverview;