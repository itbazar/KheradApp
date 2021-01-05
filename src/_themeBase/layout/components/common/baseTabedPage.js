import React, { useState } from "react";
import {
    Card,
    CardBody,
    CardHeader,
    CardHeaderToolbar,
} from "../../../../_themeBase/_partials/controls";
import { useSubheader } from "../../../../_themeBase/layout";
import { useIntl } from 'react-intl';



 export const BaseTabedPage = ({ components }) => {
    // Subheader
     const suhbeader = useSubheader();
     

    const intl = useIntl();
    // Tabs
    const [tab, setTab] = useState(components[0].tab);
    const [title, setTitle] = useState("");

    const getTab = (item) => {
        if (tab === item.tab) {
            return item.component;
        }
    };

    return (
        <Card>
            <CardBody>
                <ul className="nav nav-tabs nav-tabs-line " role="tablist">
                    {components.map(item =>
                        <li key={item.id} className="nav-item" onClick={() => setTab(item.tab)}>
                            <a
                                className={`nav-link ${tab === item.tab && "active"}`}
                                data-toggle="tab"
                                role="tab"
                                aria-selected={(tab === item.tab).toString()}
                            >
                               {intl.formatMessage({ id: item.title })} 
                            </a>
                        </li>
                    )}
                </ul>
                <div className="mt-5">
                    {components.map(item =>
                        getTab(item)
                    )}
                </div>

            </CardBody>
        </Card>
    );
}
