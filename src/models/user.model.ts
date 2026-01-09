enum Role {
    CUSTOMER = "CUSTOMER",
    STAFF = "STAFF",
    ADMIN = "ADMIN",
}

type Permission = "read" | "write" | "delete";

interface RoleAndPermission {
    [key: string]: Permission[];
}

const permissions: RoleAndPermission = {
    CUSTOMER: ["read"],
    STAFF: ["read", "write"],
    ADMIN: ["read", "write", "delete"],
}; // currently unused

interface User {
    id: number;
    userName: string;
    roles: Role[];
}
