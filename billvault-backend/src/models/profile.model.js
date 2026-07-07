/**
 * @file models/profile.model.js
 */

class Profile {
    constructor({ id, email, full_name, avatar_url, phone, provider, created_at, updated_at }) {
        this.id = id;
        this.email = email;
        this.fullName = full_name;
        this.avatarUrl = avatar_url;
        this.phone = phone;
        this.provider = provider;
        this.createdAt = created_at;
        this.updatedAt = updated_at;
    }

    toJSON() {
        return {
            id: this.id,
            email: this.email,
            fullName: this.fullName,
            avatarUrl: this.avatarUrl,
            phone: this.phone,
            provider: this.provider,
            createdAt: this.createdAt,
            updatedAt: this.updatedAt
        };
    }
}

module.exports = Profile;