import { ClientComponent } from "./client/client.component";
import { CollectionComponent } from "./collection/collection.component";
import { GroupComponent } from "./group/group.component";
import { OrderComponent } from "./order/order.component";
import { ProductComponent } from "./product/product.component";
import { SubGroupComponent } from "./sub-group/sub-group.component";
import { UserComponent } from "./user/user.component";

export const MenuItens = [
    {
        path: 'group',
        caption : 'Grupos',
        icon : 'person',
        component: GroupComponent,
    },
    {
        path: 'sub-group',
        caption : 'Sub Grupos',
        icon : 'supervisor_account',
        component: SubGroupComponent,
    },
    {
        path: 'product',
        caption : 'Produtos',
        icon : 'shopping_basket',
        component: ProductComponent,
    },
    {
        path: 'user',
        caption : 'Usuário',
        icon : 'assignment_ind',
        component: UserComponent,
    },
    {
        path: 'collection',
        caption : 'Coleção',
        icon : 'assessment',
        component: CollectionComponent,
    },
    {
        path: 'client',
        caption : 'Cliente',
        icon : 'face',
        component: ClientComponent,
    },
    {
        path: 'order',
        caption : 'Pedidos',
        icon : 'face',
        component: OrderComponent,
    }
]