import React, { useState } from 'react';
import { MenuProps, Breadcrumb, Layout, Menu } from 'antd';
import {
    DesktopOutlined,
    FileOutlined,
    PieChartOutlined,
    TeamOutlined,
    UserOutlined,
} from '@ant-design/icons';
import SkeletonAvatar from 'antd/lib/skeleton/Avatar';

const { Header, Content, Footer, Sider } = Layout;
type MenuItem = Required<MenuProps>['items'][number];

function getItem(
    label: React.ReactNode,
    key: React.Key,
    icon?: React.ReactNode,
    children?: MenuItem[]
): MenuItem {
    return {
        key,
        icon,
        children,
        label,
    } as MenuItem;
}

const items: MenuItem[] = [
    getItem('Option 1', '1', <PieChartOutlined />),
    getItem('Option 2', '2', <DesktopOutlined />),
    getItem('User', 'sub1', <UserOutlined />, [
        getItem('Tom', '3'),
        getItem('Bill', '4'),
        getItem('Alex', '5'),
    ]),
    getItem('Team', 'sub2', <TeamOutlined />, [
        getItem('Team 1', '6'),
        getItem('Team 2', '8'),
    ]),
    getItem('Files', '9', <FileOutlined />),
];

export const Dashboard = () => {
    const [collapsed, setCollapsed] = useState(false);

    return (
        <Layout style={{ minHeight: '100vh' }}>
            <Sider
                collapsible
                collapsed={collapsed}
                onCollapse={(value) => setCollapsed(value)}
                className="fixed overflow-auto left-0"
                style={{ minHeight: '100vh' }}
            >
                <div className="flex justify-center my-2 md:my-3">
                    <SkeletonAvatar size="large" />
                </div>
                <Menu
                    theme="dark"
                    defaultSelectedKeys={['1']}
                    mode="inline"
                    items={items}
                />
            </Sider>
            <Layout className="ml-48">
                <Header className="bg-gray-100" style={{ padding: 0 }}>
                    <Breadcrumb style={{ margin: '16px 0' }} className="pl-5">
                        <Breadcrumb.Item>User</Breadcrumb.Item>
                        <Breadcrumb.Item>Bill</Breadcrumb.Item>
                    </Breadcrumb>
                </Header>
                <Content style={{ margin: '0 16px' }}>
                    <div
                        className="bg-white text-xl"
                        style={{ padding: 24, minHeight: 360 }}
                    >
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                        Ut ultrices risus eu erat accumsan, sit amet ultricies
                        nunc sodales. Phasellus vel nisi in est porttitor
                        condimentum. Curabitur eget vehicula risus. Quisque
                        congue eleifend ipsum vitae fringilla. Nulla bibendum
                        lorem vitae varius convallis. Proin ipsum nunc, dictum
                        ac odio vel, tempus pulvinar nisl. Morbi tristique justo
                        id quam interdum porttitor. Vivamus ut purus maximus,
                        eleifend ligula rhoncus, lacinia est. Nullam viverra
                        lacus purus, sed congue nisi condimentum ut.
                        <br />
                        Proin condimentum diam eu dapibus placerat. Sed mollis
                        congue lorem, vitae mattis est fringilla vitae. Maecenas
                        tincidunt pretium neque, at faucibus justo malesuada et.
                        Aenean a nibh lectus. Donec rutrum et orci ut sagittis.
                        Aliquam erat volutpat. Ut mattis enim nec blandit
                        tincidunt. Praesent vitae nisi sit amet risus
                        ullamcorper scelerisque. Aliquam dapibus risus sit amet
                        odio interdum, sed gravida ante sollicitudin. Etiam erat
                        ex, hendrerit vitae tortor nec, consequat laoreet urna.
                        Phasellus tincidunt convallis nulla suscipit sodales.
                        Etiam tellus nulla, dictum non suscipit sit amet,
                        molestie eleifend ligula.
                        <br />
                        Aliquam erat volutpat. Nunc a feugiat neque. Ut massa
                        orci, elementum nec rutrum non, posuere a sapien. Sed
                        malesuada nunc et mauris gravida, vitae mollis enim
                        facilisis. Nulla at risus in massa condimentum interdum.
                        Aliquam erat volutpat. Ut ultrices leo a pellentesque
                        cursus. Maecenas id sollicitudin ipsum. Praesent rhoncus
                        suscipit porttitor.
                        <br />
                        Integer at lacinia diam. Curabitur interdum ante id
                        lobortis maximus. Vivamus rutrum risus eget augue
                        blandit porta. Morbi a augue et nibh commodo dapibus.
                        Suspendisse potenti. Curabitur tristique condimentum
                        elementum. Integer ut suscipit nunc. Sed sed erat quam.
                        Aenean pulvinar lectus et ligula vulputate, sit amet
                        pulvinar nibh varius. Donec condimentum congue libero,
                        in ullamcorper ligula molestie quis. Aliquam eu erat ac
                        arcu fringilla posuere nec et neque. In hac habitasse
                        platea dictumst. In in odio purus.
                        <br />
                        <br /> Nam eu elit diam. In consectetur accumsan
                        eleifend. Etiam in suscipit ipsum. Sed a consectetur
                        sem, at tristique quam. Pellentesque sed lectus
                        interdum, fermentum metus a, vehicula velit. Nullam
                        rutrum sit amet magna sit amet dictum. Duis congue magna
                        sed sem efficitur scelerisque. Proin vulputate pulvinar
                        purus, cursus auctor lectus aliquet non. Maecenas
                        vulputate lacus odio, et porta ex sodales id. Aliquam a
                        dignissim lacus. Ut vehicula dignissim enim vel
                        convallis. Nulla posuere lacus sit amet luctus
                        tristique. Nunc dignissim id dui quis scelerisque.
                        Suspendisse consectetur eros quis risus ornare faucibus.
                        <br />
                        <br /> Integer pharetra lectus in commodo ultricies. Sed
                        vehicula sed ante ac porta. Vivamus et lacus eleifend,
                        pulvinar sapien eget, euismod orci. Vestibulum ultrices
                        justo nunc, quis vulputate elit suscipit ut. Vivamus
                        tristique dapibus magna eget pretium. Aliquam ligula
                        leo, tempor vel metus in, porta elementum lacus. Etiam
                        ornare tempus arcu ac eleifend. Ut quis justo dictum,
                        vulputate magna eget, maximus augue. Cras eleifend lorem
                        in sagittis blandit. Sed rutrum neque at purus rutrum
                        euismod. Integer auctor felis faucibus luctus maximus.
                        Pellentesque vel bibendum turpis. Donec eget enim non
                        enim luctus laoreet at et magna.
                        <br />
                        <br /> Quisque egestas vitae felis a tristique.
                        Vestibulum ante leo, pretium eget quam vel, porttitor
                        finibus lacus. Aenean nec porttitor mi, at porttitor
                        massa. Sed tincidunt justo quis quam sagittis eleifend.
                        Fusce vitae dui sed justo pulvinar dapibus. Fusce eu
                        enim in lorem tincidunt ullamcorper at eu diam.
                        Pellentesque habitant morbi tristique senectus et netus
                        et malesuada fames ac turpis egestas. Maecenas at
                        sollicitudin dui. Praesent et metus euismod, ultrices
                        erat sed, gravida quam. Duis porttitor rhoncus eleifend.
                        Nulla molestie quam vel luctus faucibus. Fusce ultrices,
                        odio vel accumsan venenatis, neque metus scelerisque
                        diam, ut auctor odio ligula nec eros. Donec malesuada
                        fringilla lacus, at tincidunt nulla condimentum rutrum.
                        Cras vitae risus eu eros tincidunt iaculis eu ac elit.
                        Mauris finibus, massa non convallis varius, dolor arcu
                        rutrum nulla, ut condimentum orci ligula ac est. Fusce
                        ex odio, pellentesque in auctor nec, vehicula a libero.
                        <br />
                        Nam ante ligula, pellentesque eget dui a, cursus
                        efficitur dui. Morbi maximus, tortor in hendrerit
                        accumsan, ante augue ornare libero, sed ullamcorper dui
                        augue vel ex. Maecenas vel nunc aliquet elit gravida
                        accumsan. Nam in tincidunt libero. Donec ac risus in
                        justo pharetra dignissim et blandit dui. Morbi ultricies
                        pharetra velit, nec faucibus sem lobortis ac. Sed et ex
                        interdum, iaculis quam non, fermentum sapien. Praesent
                        in sagittis leo, laoreet elementum ligula. In vel
                        ullamcorper risus. Suspendisse odio tortor, placerat eu
                        accumsan vitae, molestie a odio. Sed tincidunt est non
                        quam rhoncus lacinia. Pellentesque interdum rhoncus
                        magna a sagittis. Duis vel elit neque. Donec mattis sem
                        enim, ut aliquet diam auctor nec. Aliquam consequat quam
                        nec turpis porttitor iaculis.
                        <br />
                        Praesent nec ullamcorper mauris. Nulla aliquam, eros
                        aliquet fringilla laoreet, nisi diam consequat velit, id
                        venenatis justo eros at augue. Fusce sed neque vitae
                        neque ornare congue ut vitae arcu. Vivamus sed bibendum
                        lectus, ut ultrices nulla. Quisque sagittis ipsum orci,
                        nec consequat sapien tempor at. Aliquam tempus tellus
                        diam, sit amet lacinia enim semper quis. Aenean
                        consectetur consectetur lorem, vel viverra orci porta
                        sed. Nunc porta auctor purus nec ornare. Sed commodo
                        posuere sodales. Nullam vel sapien sed nisi cursus
                        vehicula. Nullam id malesuada felis, ut fringilla dui.
                        Morbi ac sem eu nulla rutrum viverra. Ut tempor ornare
                        odio eleifend semper. Etiam aliquam egestas ullamcorper.
                        Vestibulum tristique pharetra urna, sit amet euismod
                        justo. Pellentesque habitant morbi tristique senectus et
                        netus et malesuada fames ac turpis egestas.
                        <br />
                        Cras dapibus vel diam ut luctus. Duis euismod lobortis
                        ornare. Cras vel massa nec tortor placerat mattis at at
                        quam. Nulla sollicitudin justo finibus nulla lacinia
                        semper. Cras sit amet fermentum leo. Donec ut finibus
                        velit. Nulla nec erat faucibus, hendrerit orci quis,
                        sagittis eros. Pellentesque eu nisl vestibulum, maximus
                        dui nec, finibus nibh. Vivamus nunc tellus, dictum ut
                        gravida id, gravida eget mauris.
                        <br />
                        Donec et metus venenatis elit rutrum ornare sed sed
                        purus. Suspendisse auctor sapien et feugiat consequat.
                        Curabitur est metus, gravida vitae porta ut, imperdiet
                        quis turpis. Phasellus elementum quam nec commodo
                        condimentum. In hac habitasse platea dictumst. In nec
                        bibendum odio, id pharetra massa. Pellentesque mollis
                        scelerisque consequat. Phasellus odio neque, blandit a
                        viverra sed, elementum in tortor. Phasellus tincidunt
                        libero ac est venenatis, nec fringilla nulla efficitur.
                        Nam pellentesque est luctus leo fermentum, tempus congue
                        augue lacinia. Nunc ullamcorper venenatis convallis. Ut
                        urna dui, mattis quis vestibulum a, facilisis ut ante.
                        <br />
                        Nam nec ullamcorper turpis, vitae suscipit tortor.
                        Vestibulum eu blandit nunc. Morbi congue dolor eu
                        finibus vestibulum. Sed gravida vel nunc sit amet
                        suscipit. Nam volutpat sapien eu neque luctus, fringilla
                        lacinia ligula bibendum. Curabitur a dolor eget nulla
                        fermentum ultricies. Fusce venenatis lobortis arcu, ac
                        ultrices neque aliquam et. Pellentesque et gravida
                        purus. Nam nibh ipsum, pellentesque at enim id, luctus
                        venenatis nunc. Vivamus non lobortis lorem. Donec urna
                        nulla, lacinia vitae ipsum consequat, rhoncus molestie
                        ipsum. Maecenas nisl arcu, consequat et facilisis ut,
                        laoreet sed tellus.
                        <br />
                        Etiam nec erat eget ligula gravida efficitur. Vivamus
                        fringilla velit eget posuere cursus. Sed vitae faucibus
                        nulla. Fusce ante leo, tincidunt ut mauris ut, lobortis
                        ornare erat. Nulla fermentum eget eros non eleifend.
                        Cras ut commodo neque. Fusce congue orci molestie tempus
                        ullamcorper. Praesent at nisi sit amet ante rutrum
                        malesuada a eu orci. Aliquam tincidunt aliquet lectus et
                        consectetur. Vivamus dignissim, enim ac elementum
                        vestibulum, ante justo tristique erat, vel iaculis ante
                        est at enim. Nullam ut quam metus. Vestibulum ante ipsum
                        primis in faucibus orci luctus et ultrices posuere
                        cubilia curae; Integer ac gravida ante. Donec mattis
                        tincidunt mollis.Lorem ipsum dolor sit amet, consectetur
                        adipiscing elit. Ut ultrices risus eu erat accumsan, sit
                        amet ultricies nunc sodales. Phasellus vel nisi in est
                        porttitor condimentum. Curabitur eget vehicula risus.
                        Quisque congue eleifend ipsum vitae fringilla. Nulla
                        bibendum lorem vitae varius convallis. Proin ipsum nunc,
                        dictum ac odio vel, tempus pulvinar nisl. Morbi
                        tristique justo id quam interdum porttitor. Vivamus ut
                        purus maximus, eleifend ligula rhoncus, lacinia est.
                        Nullam viverra lacus purus, sed congue nisi condimentum
                        ut.
                        <br />
                        Proin condimentum diam eu dapibus placerat. Sed mollis
                        congue lorem, vitae mattis est fringilla vitae. Maecenas
                        tincidunt pretium neque, at faucibus justo malesuada et.
                        Aenean a nibh lectus. Donec rutrum et orci ut sagittis.
                        Aliquam erat volutpat. Ut mattis enim nec blandit
                        tincidunt. Praesent vitae nisi sit amet risus
                        ullamcorper scelerisque. Aliquam dapibus risus sit amet
                        odio interdum, sed gravida ante sollicitudin. Etiam erat
                        ex, hendrerit vitae tortor nec, consequat laoreet urna.
                        Phasellus tincidunt convallis nulla suscipit sodales.
                        Etiam tellus nulla, dictum non suscipit sit amet,
                        molestie eleifend ligula.
                        <br />
                        Aliquam erat volutpat. Nunc a feugiat neque. Ut massa
                        orci, elementum nec rutrum non, posuere a sapien. Sed
                        malesuada nunc et mauris gravida, vitae mollis enim
                        facilisis. Nulla at risus in massa condimentum interdum.
                        Aliquam erat volutpat. Ut ultrices leo a pellentesque
                        cursus. Maecenas id sollicitudin ipsum. Praesent rhoncus
                        suscipit porttitor.
                        <br />
                        Integer at lacinia diam. Curabitur interdum ante id
                        lobortis maximus. Vivamus rutrum risus eget augue
                        blandit porta. Morbi a augue et nibh commodo dapibus.
                        Suspendisse potenti. Curabitur tristique condimentum
                        elementum. Integer ut suscipit nunc. Sed sed erat quam.
                        Aenean pulvinar lectus et ligula vulputate, sit amet
                        pulvinar nibh varius. Donec condimentum congue libero,
                        in ullamcorper ligula molestie quis. Aliquam eu erat ac
                        arcu fringilla posuere nec et neque. In hac habitasse
                        platea dictumst. In in odio purus.
                        <br />
                        <br /> Nam eu elit diam. In consectetur accumsan
                        eleifend. Etiam in suscipit ipsum. Sed a consectetur
                        sem, at tristique quam. Pellentesque sed lectus
                        interdum, fermentum metus a, vehicula velit. Nullam
                        rutrum sit amet magna sit amet dictum. Duis congue magna
                        sed sem efficitur scelerisque. Proin vulputate pulvinar
                        purus, cursus auctor lectus aliquet non. Maecenas
                        vulputate lacus odio, et porta ex sodales id. Aliquam a
                        dignissim lacus. Ut vehicula dignissim enim vel
                        convallis. Nulla posuere lacus sit amet luctus
                        tristique. Nunc dignissim id dui quis scelerisque.
                        Suspendisse consectetur eros quis risus ornare faucibus.
                        <br />
                        <br /> Integer pharetra lectus in commodo ultricies. Sed
                        vehicula sed ante ac porta. Vivamus et lacus eleifend,
                        pulvinar sapien eget, euismod orci. Vestibulum ultrices
                        justo nunc, quis vulputate elit suscipit ut. Vivamus
                        tristique dapibus magna eget pretium. Aliquam ligula
                        leo, tempor vel metus in, porta elementum lacus. Etiam
                        ornare tempus arcu ac eleifend. Ut quis justo dictum,
                        vulputate magna eget, maximus augue. Cras eleifend lorem
                        in sagittis blandit. Sed rutrum neque at purus rutrum
                        euismod. Integer auctor felis faucibus luctus maximus.
                        Pellentesque vel bibendum turpis. Donec eget enim non
                        enim luctus laoreet at et magna.
                        <br />
                        <br /> Quisque egestas vitae felis a tristique.
                        Vestibulum ante leo, pretium eget quam vel, porttitor
                        finibus lacus. Aenean nec porttitor mi, at porttitor
                        massa. Sed tincidunt justo quis quam sagittis eleifend.
                        Fusce vitae dui sed justo pulvinar dapibus. Fusce eu
                        enim in lorem tincidunt ullamcorper at eu diam.
                        Pellentesque habitant morbi tristique senectus et netus
                        et malesuada fames ac turpis egestas. Maecenas at
                        sollicitudin dui. Praesent et metus euismod, ultrices
                        erat sed, gravida quam. Duis porttitor rhoncus eleifend.
                        Nulla molestie quam vel luctus faucibus. Fusce ultrices,
                        odio vel accumsan venenatis, neque metus scelerisque
                        diam, ut auctor odio ligula nec eros. Donec malesuada
                        fringilla lacus, at tincidunt nulla condimentum rutrum.
                        Cras vitae risus eu eros tincidunt iaculis eu ac elit.
                        Mauris finibus, massa non convallis varius, dolor arcu
                        rutrum nulla, ut condimentum orci ligula ac est. Fusce
                        ex odio, pellentesque in auctor nec, vehicula a libero.
                        <br />
                        Nam ante ligula, pellentesque eget dui a, cursus
                        efficitur dui. Morbi maximus, tortor in hendrerit
                        accumsan, ante augue ornare libero, sed ullamcorper dui
                        augue vel ex. Maecenas vel nunc aliquet elit gravida
                        accumsan. Nam in tincidunt libero. Donec ac risus in
                        justo pharetra dignissim et blandit dui. Morbi ultricies
                        pharetra velit, nec faucibus sem lobortis ac. Sed et ex
                        interdum, iaculis quam non, fermentum sapien. Praesent
                        in sagittis leo, laoreet elementum ligula. In vel
                        ullamcorper risus. Suspendisse odio tortor, placerat eu
                        accumsan vitae, molestie a odio. Sed tincidunt est non
                        quam rhoncus lacinia. Pellentesque interdum rhoncus
                        magna a sagittis. Duis vel elit neque. Donec mattis sem
                        enim, ut aliquet diam auctor nec. Aliquam consequat quam
                        nec turpis porttitor iaculis.
                        <br />
                        Praesent nec ullamcorper mauris. Nulla aliquam, eros
                        aliquet fringilla laoreet, nisi diam consequat velit, id
                        venenatis justo eros at augue. Fusce sed neque vitae
                        neque ornare congue ut vitae arcu. Vivamus sed bibendum
                        lectus, ut ultrices nulla. Quisque sagittis ipsum orci,
                        nec consequat sapien tempor at. Aliquam tempus tellus
                        diam, sit amet lacinia enim semper quis. Aenean
                        consectetur consectetur lorem, vel viverra orci porta
                        sed. Nunc porta auctor purus nec ornare. Sed commodo
                        posuere sodales. Nullam vel sapien sed nisi cursus
                        vehicula. Nullam id malesuada felis, ut fringilla dui.
                        Morbi ac sem eu nulla rutrum viverra. Ut tempor ornare
                        odio eleifend semper. Etiam aliquam egestas ullamcorper.
                        Vestibulum tristique pharetra urna, sit amet euismod
                        justo. Pellentesque habitant morbi tristique senectus et
                        netus et malesuada fames ac turpis egestas.
                        <br />
                        Cras dapibus vel diam ut luctus. Duis euismod lobortis
                        ornare. Cras vel massa nec tortor placerat mattis at at
                        quam. Nulla sollicitudin justo finibus nulla lacinia
                        semper. Cras sit amet fermentum leo. Donec ut finibus
                        velit. Nulla nec erat faucibus, hendrerit orci quis,
                        sagittis eros. Pellentesque eu nisl vestibulum, maximus
                        dui nec, finibus nibh. Vivamus nunc tellus, dictum ut
                        gravida id, gravida eget mauris.
                        <br />
                        Donec et metus venenatis elit rutrum ornare sed sed
                        purus. Suspendisse auctor sapien et feugiat consequat.
                        Curabitur est metus, gravida vitae porta ut, imperdiet
                        quis turpis. Phasellus elementum quam nec commodo
                        condimentum. In hac habitasse platea dictumst. In nec
                        bibendum odio, id pharetra massa. Pellentesque mollis
                        scelerisque consequat. Phasellus odio neque, blandit a
                        viverra sed, elementum in tortor. Phasellus tincidunt
                        libero ac est venenatis, nec fringilla nulla efficitur.
                        Nam pellentesque est luctus leo fermentum, tempus congue
                        augue lacinia. Nunc ullamcorper venenatis convallis. Ut
                        urna dui, mattis quis vestibulum a, facilisis ut ante.
                        <br />
                        Nam nec ullamcorper turpis, vitae suscipit tortor.
                        Vestibulum eu blandit nunc. Morbi congue dolor eu
                        finibus vestibulum. Sed gravida vel nunc sit amet
                        suscipit. Nam volutpat sapien eu neque luctus, fringilla
                        lacinia ligula bibendum. Curabitur a dolor eget nulla
                        fermentum ultricies. Fusce venenatis lobortis arcu, ac
                        ultrices neque aliquam et. Pellentesque et gravida
                        purus. Nam nibh ipsum, pellentesque at enim id, luctus
                        venenatis nunc. Vivamus non lobortis lorem. Donec urna
                        nulla, lacinia vitae ipsum consequat, rhoncus molestie
                        ipsum. Maecenas nisl arcu, consequat et facilisis ut,
                        laoreet sed tellus.
                        <br />
                        Etiam nec erat eget ligula gravida efficitur. Vivamus
                        fringilla velit eget posuere cursus. Sed vitae faucibus
                        nulla. Fusce ante leo, tincidunt ut mauris ut, lobortis
                        ornare erat. Nulla fermentum eget eros non eleifend.
                        Cras ut commodo neque. Fusce congue orci molestie tempus
                        ullamcorper. Praesent at nisi sit amet ante rutrum
                        malesuada a eu orci. Aliquam tincidunt aliquet lectus et
                        consectetur. Vivamus dignissim, enim ac elementum
                        vestibulum, ante justo tristique erat, vel iaculis ante
                        est at enim. Nullam ut quam metus. Vestibulum ante ipsum
                        primis in faucibus orci luctus et ultrices posuere
                        cubilia curae; Integer ac gravida ante. Donec mattis
                        tincidunt mollis.
                    </div>
                </Content>
                <Footer style={{ textAlign: 'center' }}>
                    Ant Design ©2018 Created by Ant UED
                </Footer>
            </Layout>
        </Layout>
    );
};
