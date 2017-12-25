/**
 * External Dependencies
 */
import { connect } from 'react-redux';

/**
 * WordPress Dependencies
 */
import { PanelBody, Button, ClipboardButton } from '@wordpress/components';
import { __ } from '@wordpress/i18n';
import { Component } from '@wordpress/element';

/**
 * Internal Dependencies
 */
import { getCurrentPost } from '../../store/selectors';

class PostPublishPanelPostpublish extends Component {
	constructor() {
		super( ...arguments );
		this.state = {
			showCopyConfirmation: false,
		};
		this.onCopy = this.onCopy.bind( this );
		this.onSelectInput = this.onSelectInput.bind( this );
	}

	componentWillUnmount() {
		clearTimeout( this.dismissCopyConfirmation );
	}

	onCopy() {
		this.setState( {
			showCopyConfirmation: true,
		} );

		clearTimeout( this.dismissCopyConfirmation );
		this.dismissCopyConfirmation = setTimeout( () => {
			this.setState( {
				showCopyConfirmation: false,
			} );
		}, 4000 );
	}

	onSelectInput( event ) {
		event.target.select();
	}

	render() {
		const { post } = this.props;

		return (
			<div className="post-publish-panel__postpublish">
				<PanelBody className="post-publish-panel__postpublish-header">
					<a href={ post.link }>{ post.title || __( '(no title)' ) }</a>{ __( ' is now live.' ) }
				</PanelBody>
				<PanelBody>
					<div><strong>{ __( 'What\'s next?' ) }</strong></div>
					<input
						className="post-publish-panel__postpublish-link-input"
						type="text"
						readOnly
						value={ post.link }
						onClick={ this.onSelectInput }
					/>
					<div className="post-publish-panel__postpublish-buttons">
						<Button className="button" href={ post.link }>
							{ __( 'View Post' ) }
						</Button>

						<ClipboardButton className="button" text={ post.link } onCopy={ this.onCopy }>
							{ this.state.showCopyConfirmation ? __( 'Copied!' ) : __( 'Copy Link' ) }
						</ClipboardButton>
					</div>
				</PanelBody>
			</div>
		);
	}
}

export default connect(
	state => ( {
		post: getCurrentPost( state ),
	} )
)( PostPublishPanelPostpublish );
