import { FetchReturn } from '@nuxt/content/types/query-builder';
import { Route } from 'vue-router';

// Navigation
interface I_Nav {
    anchor: string;
    href: string;
}

// Meta tags
interface I_MetaForPageParams {
    page: I_ExtendedFetchReturn;
    route: Route;
    extendedMetaTags?: I_MetaObject_MetaTag[];
}

interface I_MetaObject_MetaTag {
    hid: string;
    content: string;
    name?: string;
    property?: string;
}

interface I_MetaObject {
    title: string;
    meta: I_MetaObject_MetaTag[];
    link: any[];
}

// Page content
interface I_ExtendedFetchReturn extends FetchReturn {
    title: string;
    description: string;
}

type T_PageComponentAsyncDataResult = FetchReturn | FetchReturn[];

interface I_PageComponentAsyncData {
    page: T_PageComponentAsyncDataResult;
}

interface I_PageComponent {
    page: I_ExtendedFetchReturn;
    head: () => I_MetaObject;
}

interface I_BlogPageComponentAsyncData {
    list: FetchReturn | FetchReturn[];
}
