import { useUserContext } from 'UserContext';
import { useApi } from 'api/api';
import { SpinnerView } from 'components/Spinner';
import './Pages.scss';

export default function Settings() {
    const userId = useUserContext();
    const { json, isLoading } = useApi(`v1/users/${userId}`);

    return (
        <div className='settings'>
            <div className='page__header'>
                <h1 className='page__head'>Settings</h1>
            </div>
            { isLoading
                ? (
                    <SpinnerView />
                )
                : (
                    <div>
                        { JSON.stringify(json) }
                    </div>
                )
            }
        </div>
    );
}
